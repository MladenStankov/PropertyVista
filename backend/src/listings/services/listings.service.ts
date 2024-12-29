import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing } from '../entity/listing.entity';
import { ListingDto } from '../dto/listing.dto';
import { User } from 'src/users/entity/user.entity';
import { PublishListingDto } from '../dto/publish-listing.dto';
import { ListingLocationsService } from './listing-locations.service';
import { ListingImagesService } from './listing-images.service';
import { ListingAmenitiesService } from './listing-amenities.service';
import { ListingRoomsService } from './listing-rooms.service';
import { IListing } from '../dto/get-all-listing.dto';
import { RoomType } from '../types/room-type.dto';
import { IFilter } from '../dto/filter-inteface';
import { SortType } from '../types/sort-type.type';
import { IListingExtended } from '../dto/get-by-uuid-listing.dto';
import { ListingViewsService } from './listing-views.service';
import { MostViewedListingsDto } from '../dto/most-viewed-listings.dto';
import { Request } from 'express';
import { UpdateListingDto } from '../dto/update-listing.dto';
import { IForEditing } from '../dto/get-for-editing.dto';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,
    private listingLocationsService: ListingLocationsService,
    private listingImagesService: ListingImagesService,
    private listingAmenitiesService: ListingAmenitiesService,
    private listingRoomsService: ListingRoomsService,
    private listingViewsService: ListingViewsService,
  ) {}

  async create(createListingDto: ListingDto): Promise<Listing> {
    const newListing = this.listingRepository.create(createListingDto);
    return newListing.save();
  }

  async findById(id: number): Promise<Listing> {
    return this.listingRepository.findOneBy({ id });
  }

  async findByUuid(uuid: string): Promise<Listing> {
    return this.listingRepository.findOneBy({ uuid });
  }

  async getByUser(user: User): Promise<Listing[]> {
    return this.listingRepository.find({
      where: { user },
    });
  }

  async publish(publishListingDto: PublishListingDto) {
    const newListing = await this.create(publishListingDto.listing);

    publishListingDto.location.listing = newListing;
    this.listingLocationsService.create(publishListingDto.location);

    publishListingDto.images.forEach((createListingImageDto) => {
      createListingImageDto.listing = newListing;
      this.listingImagesService.create(createListingImageDto);
    });

    publishListingDto.amenities.forEach((createAmenitiesDto) => {
      createAmenitiesDto.listing = newListing;
      this.listingAmenitiesService.create(createAmenitiesDto);
    });

    publishListingDto.rooms.forEach((createListingRoomDto) => {
      createListingRoomDto.listing = newListing;
      this.listingRoomsService.create(createListingRoomDto);
    });

    return newListing.uuid;
  }

  private getNumberOfRooms(listing: Listing, roomType: RoomType): number {
    const result = listing.rooms
      .filter((room) => room.type === roomType)
      .reduce((sum, room) => sum + room.amount, 0);

    return result || 0;
  }

  async getAll(
    filter?: IFilter,
    sort?: SortType,
    search?: string,
  ): Promise<IListing[]> {
    const query = this.listingRepository.createQueryBuilder('listing');

    query
      .leftJoinAndSelect('listing.images', 'images')
      .leftJoinAndSelect('listing.location', 'location')
      .leftJoinAndSelect('listing.rooms', 'rooms')
      .leftJoinAndSelect('listing.amenities', 'amenities');

    if (search) {
      query.andWhere(
        `LOWER(CONCAT(location.streetName, ' ', location.streetNumber, ', ', location.postalCode, ', ', location.city, ', ', location.country)) LIKE :search`,
        { search: `%${search.toLowerCase()}%` },
      );
    }

    if (filter) {
      if (filter.type) {
        query.andWhere('listing.type = :type', { type: filter.type });
      }
      if (filter.constructionType) {
        query.andWhere('listing.constructionType = :constructionType', {
          constructionType: filter.constructionType,
        });
      }

      if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
        if (filter.minPrice !== undefined && filter.maxPrice !== undefined) {
          query.andWhere('listing.price BETWEEN :minPrice AND :maxPrice', {
            minPrice: filter.minPrice,
            maxPrice: filter.maxPrice,
          });
        } else if (filter.minPrice !== undefined) {
          query.andWhere('listing.price >= :minPrice', {
            minPrice: filter.minPrice,
          });
        } else if (filter.maxPrice !== undefined) {
          query.andWhere('listing.price <= :maxPrice', {
            maxPrice: filter.maxPrice,
          });
        }
      }

      if (
        filter.minSurfaceArea !== undefined ||
        filter.maxSurfaceArea !== undefined
      ) {
        if (
          filter.minSurfaceArea !== undefined &&
          filter.maxSurfaceArea !== undefined
        ) {
          query.andWhere(
            'listing.livingSurface BETWEEN :minSurface AND :maxSurface',
            {
              minSurface: filter.minSurfaceArea,
              maxSurface: filter.maxSurfaceArea,
            },
          );
        } else if (filter.minSurfaceArea !== undefined) {
          query.andWhere('listing.livingSurface >= :minSurface', {
            minSurface: filter.minSurfaceArea,
          });
        } else if (filter.maxSurfaceArea !== undefined) {
          query.andWhere('listing.livingSurface <= :maxSurface', {
            maxSurface: filter.maxSurfaceArea,
          });
        }
      }

      if (filter.minYear !== undefined || filter.maxYear !== undefined) {
        query.andWhere(
          'listing.constructionYear BETWEEN :minYear AND :maxYear',
          {
            minYear: filter.minYear || 0,
            maxYear: filter.maxYear || new Date().getFullYear(),
          },
        );
      }

      for (const roomType of Object.values(RoomType)) {
        const minKey = `min${roomType}` as keyof IFilter;
        const maxKey = `max${roomType}` as keyof IFilter;

        if (filter[minKey] !== undefined || filter[maxKey] !== undefined) {
          query.andWhere(
            `rooms.type = :roomType AND rooms.amount BETWEEN :minAmount AND :maxAmount`,
            {
              roomType,
              minAmount: filter[minKey] || 0,
              maxAmount: filter[maxKey] || Number.MAX_SAFE_INTEGER,
            },
          );
        }
      }

      if (filter.amenities && filter.amenities.length > 0) {
        query.andWhere(
          (subQuery) => {
            const sub = subQuery
              .subQuery()
              .select('COUNT(la.id)', 'amenitiesCount')
              .from('ListingAmenity', 'la')
              .where('la.listingId = listing.id')
              .andWhere('la.type IN (:...amenities)', {
                amenities: filter.amenities,
              });
            return `${sub.getQuery()} = :requiredCount`;
          },
          { requiredCount: filter.amenities.length },
        );
      }

      switch (sort) {
        case SortType.PRICE_ASC:
          query.orderBy('listing.price', 'ASC');
          break;
        case SortType.PRICE_DESC:
          query.orderBy('listing.price', 'DESC');
          break;
        case SortType.SURFACE_AREA_ASC:
          query.orderBy('listing.livingSurface', 'ASC');
          break;
        case SortType.SURFACE_AREA_DESC:
          query.orderBy('listing.livingSurface', 'DESC');
          break;
        case SortType.CONSTRUCTION_YEAR_ASC:
          query.orderBy('listing.constructionYear', 'ASC');
          break;
        case SortType.CONSTRUCTION_YEAR_DESC:
          query.orderBy('listing.constructionYear', 'DESC');
          break;
        case SortType.NEWEST:
          query.orderBy('listing.createdAt', 'DESC');
          break;
        case SortType.OLDEST:
          query.orderBy('listing.createdAt', 'ASC');
          break;
      }

      const listings = await query.getMany();

      return listings.map((listing) => {
        const formattedAddress = `${listing.location.streetName} ${listing.location.streetNumber}, ${listing.location.postalCode}, ${listing.location.city}, ${listing.location.country}`;

        return {
          uuid: listing.uuid,
          address: formattedAddress,
          imageUrl: listing.images[0]?.imageUrl || '',
          type: listing.type,
          constructionType: listing.constructionType,
          numberOfBedrooms: this.getNumberOfRooms(listing, RoomType.BEDROOM),
          numberOfBathrooms: this.getNumberOfRooms(listing, RoomType.BATHROOM),
          numberOfFloors: this.getNumberOfRooms(listing, RoomType.FLOOR),
          surfaceArea: listing.livingSurface,
          price: listing.price,
        };
      });
    }
  }

  async getByUUID(uuid: string): Promise<IListingExtended> {
    const listing = await this.listingRepository.findOne({
      where: { uuid },
      relations: ['location', 'images', 'amenities', 'rooms', 'user'],
    });

    await this.listingViewsService.create(listing);

    const formattedAddress = `${listing.location.streetName} ${listing.location.streetNumber}, ${listing.location.postalCode}, ${listing.location.city}, ${listing.location.country}`;

    return {
      userId: listing.user.id,
      userFullName: listing.user.fullName,
      userImage: listing.user.imageUrl,
      address: formattedAddress,
      images: listing.images.map((image) => image.imageUrl),
      type: listing.type,
      constructionType: listing.constructionType,
      numberOfBedrooms: this.getNumberOfRooms(listing, RoomType.BEDROOM),
      numberOfBathrooms: this.getNumberOfRooms(listing, RoomType.BATHROOM),
      numberOfOtherRooms: this.getNumberOfRooms(listing, RoomType.OTHER),
      numberOfFloors: this.getNumberOfRooms(listing, RoomType.FLOOR),
      surfaceArea: listing.livingSurface,
      price: listing.price,
      description: listing.description,
      amenities: listing.amenities.map((amenity) => amenity.type),
      longitude: listing.location.longitude,
      latitude: listing.location.latitude,
      constructionYear: listing.constructionYear,
    };
  }

  async getForEditingByUUID(uuid: string): Promise<IForEditing> {
    const listing = await this.listingRepository.findOne({
      where: { uuid },
      relations: ['location', 'images', 'amenities', 'rooms', 'user'],
    });

    await this.listingViewsService.create(listing);

    return {
      address: {
        streetNumber: listing.location.streetNumber,
        streetName: listing.location.streetName,
        postalCode: listing.location.postalCode,
        city: listing.location.city,
        country: listing.location.country,
        state: listing.location.state,
      },
      location: {
        longitude: listing.location.longitude,
        latitude: listing.location.latitude,
      },
      images: listing.images.map((image) => image.imageUrl),
      rooms: {
        numberOfBedrooms: String(
          this.getNumberOfRooms(listing, RoomType.BEDROOM),
        ),
        numberOfBathrooms: String(
          this.getNumberOfRooms(listing, RoomType.BATHROOM),
        ),
        numberOfOtherRooms: String(
          this.getNumberOfRooms(listing, RoomType.OTHER),
        ),
        numberOfFloors: String(this.getNumberOfRooms(listing, RoomType.FLOOR)),
      },
      amenities: listing.amenities.map((amenity) => amenity.type),
      general: {
        constructionType: listing.constructionType,
        constructionYear: String(listing.constructionYear),
        surfaceArea: String(listing.livingSurface),
        price: String(listing.price),
        description: listing.description,
        type: listing.type,
      },
    };
  }

  async getTopViewed(): Promise<MostViewedListingsDto[]> {
    const listings = await this.listingRepository
      .createQueryBuilder('listing')
      .leftJoin('listing.images', 'images')
      .leftJoin('listing.location', 'location')
      .leftJoin('listing.views', 'views')
      .select([
        'listing.id AS id',
        'listing.uuid AS uuid',
        'listing.price AS price',
        'listing.type AS type',
        'MAX(location.city) AS city',
        'MAX(location.country) AS country',
        "COALESCE(MIN(images.imageUrl), '') AS imageUrl",
        'COUNT(views.id) AS view_count',
      ])
      .groupBy('listing.id')
      .addGroupBy('listing.uuid')
      .orderBy('view_count', 'DESC')
      .limit(5)
      .getRawMany();

    return listings.map((listing) => ({
      uuid: listing.uuid,
      price: listing.price,
      location: `${listing.city}, ${listing.country}`,
      imageUrl: listing.imageurl || '',
      type: listing.type,
    }));
  }

  async deleteByUuid(uuid: string, req: Request): Promise<void> {
    const { id } = req.user as User;

    const listing = await this.listingRepository.findOne({
      where: { uuid },
      relations: ['user'],
    });

    if (listing.user.id !== id) {
      throw new UnauthorizedException(
        'You are not authorized to delete this listing.',
      );
    }

    await this.listingRepository.remove(listing);
  }

  async updateListingByUuid(
    uuid: string,
    updateData: UpdateListingDto,
  ): Promise<string> {
    const listing = await this.listingRepository.findOne({
      where: { uuid },
      relations: ['user', 'images', 'location', 'amenities', 'rooms'],
    });

    if (listing.user.id !== updateData.listing.user.id) {
      throw new UnauthorizedException(
        'You are not authorized to update this listing.',
      );
    }

    Object.assign(listing, {
      description: updateData.listing.description ?? listing.description,
      price: updateData.listing.price ?? listing.price,
      livingSurface: updateData.listing.livingSurface ?? listing.livingSurface,
      constructionYear:
        updateData.listing.constructionYear ?? listing.constructionYear,
      constructionType:
        updateData.listing.constructionType ?? listing.constructionType,
      type: updateData.listing.type ?? listing.type,
    });

    Object.assign(listing.location, {
      streetNumber:
        updateData.location.streetNumber ?? listing.location.streetNumber,
      streetName: updateData.location.streetName ?? listing.location.streetName,
      postalCode: updateData.location.postalCode ?? listing.location.postalCode,
      city: updateData.location.city ?? listing.location.city,
      state: updateData.location.state ?? listing.location.state,
      country: updateData.location.country ?? listing.location.country,
      longitude: updateData.location.longitude ?? listing.location.longitude,
      latitude: updateData.location.latitude ?? listing.location.latitude,
    });

    if (updateData.rooms.length > 0) {
      listing.rooms.forEach((room) => {
        const roomToUpdate = updateData.rooms.find((r) => r.type === room.type);
        if (roomToUpdate) {
          room.amount = roomToUpdate.amount;
        }
      });
    }

    updateData.images.forEach((image) => {
      image.listing = listing;
      this.listingImagesService.create(image);
    });

    updateData.amenities.forEach((amenity) => {
      const alreadyExists = listing.amenities.find(
        (a) => a.type === amenity.type,
      );
      if (alreadyExists) return;
      amenity.listing = listing;
      this.listingAmenitiesService.create(amenity);
    });

    updateData.deletedImages.forEach((image) => {
      this.listingImagesService.delete(image.imageUrl, listing);
    });

    updateData.deletedAmenities.forEach((amenity) => {
      const alreadyExists = listing.amenities.find(
        (a) => a.type === amenity.type,
      );
      if (!alreadyExists) return;
      this.listingAmenitiesService.delete(alreadyExists);
    });

    await this.listingRepository.save(listing);

    return uuid;
  }
}
