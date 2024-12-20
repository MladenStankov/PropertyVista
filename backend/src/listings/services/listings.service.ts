import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing } from '../entity/listing.entity';
import { CreateListingDto } from '../dto/create-listing.dto';
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

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,
    private listingLocationsService: ListingLocationsService,
    private listingImagesService: ListingImagesService,
    private listingAmenitiesService: ListingAmenitiesService,
    private listingRoomsService: ListingRoomsService,
  ) {}

  async create(createListingDto: CreateListingDto): Promise<Listing> {
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
    const newListing = await this.create(publishListingDto.createListing);

    publishListingDto.createLocation.listing = newListing;
    this.listingLocationsService.create(publishListingDto.createLocation);

    publishListingDto.createImages.forEach((createListingImageDto) => {
      createListingImageDto.listing = newListing;
      this.listingImagesService.create(createListingImageDto);
    });

    publishListingDto.createAmenities.forEach((createAmenitiesDto) => {
      createAmenitiesDto.listing = newListing;
      this.listingAmenitiesService.create(createAmenitiesDto);
    });

    publishListingDto.createRooms.forEach((createListingRoomDto) => {
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

  // async filter(listings: Listing[], filter: IFilter): Promise<Listing[]> {
  //   const isInRange = (
  //     value: number,
  //     min?: number | null,
  //     max?: number | null,
  //   ): boolean => {
  //     return (
  //       (min === null || min === undefined || value >= min) &&
  //       (max === null || max === undefined || value <= max)
  //     );
  //   };

  //   return listings.filter((listing) => {
  //     const typeMatch = filter.type ? listing.type === filter.type : true;
  //     const constructionTypeMatch = filter.constructionType
  //       ? listing.constructionType === filter.constructionType
  //       : true;

  //     const priceMatch = isInRange(
  //       listing.price,
  //       filter.minPrice,
  //       filter.maxPrice,
  //     );
  //     const livingSurfaceMatch = isInRange(
  //       listing.livingSurface,
  //       filter.minSurfaceArea,
  //       filter.maxSurfaceArea,
  //     );
  //     const constructionYearMatch = isInRange(
  //       listing.constructionYear,
  //       filter.minYear,
  //       filter.maxYear,
  //     );

  //     const roomsMatch = listing.rooms.every((room) => {
  //       const minKey = `min${room.type}` as keyof IFilter;
  //       const maxKey = `max${room.type}` as keyof IFilter;

  //       return isInRange(
  //         room.amount,
  //         filter[minKey] as number,
  //         filter[maxKey] as number,
  //       );
  //     });

  //     return (
  //       typeMatch &&
  //       constructionTypeMatch &&
  //       priceMatch &&
  //       livingSurfaceMatch &&
  //       constructionYearMatch &&
  //       roomsMatch
  //     );
  //   });
  // }

  // async search(listings: Listing[], search: string): Promise<Listing[]> {
  //   const similarListings = listings.filter((listing) => {
  //     const formattedAddress =
  //       `${listing.location.streetName} ${listing.location.streetNumber}, ${listing.location.postalCode}, ${listing.location.city}, ${listing.location.country}`.toLowerCase();
  //     const similarityScore = similarity.compareTwoStrings(
  //       formattedAddress,
  //       search,
  //     );
  //     return similarityScore > 0.5;
  //   });

  //   return similarListings;
  // }

  // async sort(listings: Listing[], sort: SortType): Promise<Listing[]> {
  //   switch (sort) {
  //     case SortType.PRICE_ASC:
  //       return listings.sort((a, b) => a.price - b.price);
  //     case SortType.PRICE_DESC:
  //       return listings.sort((a, b) => b.price - a.price);
  //     case SortType.SURFACE_AREA_ASC:
  //       return listings.sort((a, b) => a.livingSurface - b.livingSurface);
  //     case SortType.SURFACE_AREA_DESC:
  //       return listings.sort((a, b) => b.livingSurface - a.livingSurface);
  //     case SortType.CONSTRUCTION_YEAR_ASC:
  //       return listings.sort((a, b) => a.constructionYear - b.constructionYear);
  //     case SortType.CONSTRUCTION_YEAR_DESC:
  //       return listings.sort((a, b) => b.constructionYear - a.constructionYear);
  //     case SortType.NEWEST:
  //       return listings.sort(
  //         (a, b) => Number(b.createdAt) - Number(a.createdAt),
  //       );
  //     case SortType.OLDEST:
  //       return listings.sort(
  //         (a, b) => Number(a.createdAt) - Number(b.createdAt),
  //       );
  //   }
  // }
}
