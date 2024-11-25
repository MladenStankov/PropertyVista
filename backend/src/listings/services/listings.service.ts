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

  async getAll(): Promise<IListing[]> {
    const listings = await this.listingRepository.find({
      relations: { images: true, location: true, rooms: true },
    });

    return listings.map((listing) => {
      const formattedAddress = `${listing.location.streetName} ${listing.location.streetNumber}, ${listing.location.postalCode}, ${listing.location.city}, ${listing.location.country}`;

      const transformedListing: IListing = {
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

      return transformedListing;
    });
  }
}
