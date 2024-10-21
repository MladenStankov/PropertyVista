import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListingAmenity } from '../entity/listing-amenity.entity';
import { Repository } from 'typeorm';
import { CreateListingAmenityDto } from '../dto/create-listing-amenity.dto';

@Injectable()
export class ListingAmenitiesService {
  constructor(
    @InjectRepository(ListingAmenity)
    private listingAmenityRepository: Repository<ListingAmenity>,
  ) {}

  async create(
    createListingAmenityDto: CreateListingAmenityDto,
  ): Promise<ListingAmenity> {
    const newListingAmenity = this.listingAmenityRepository.create(
      createListingAmenityDto,
    );

    return newListingAmenity.save();
  }

  async getAllByListingUuid(listingUuid: string): Promise<ListingAmenity[]> {
    return this.listingAmenityRepository.find({
      where: { listing: { uuid: listingUuid } },
    });
  }
}
