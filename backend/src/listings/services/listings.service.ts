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

  async getAll(): Promise<Listing[]> {
    return this.listingRepository.find();
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
}
