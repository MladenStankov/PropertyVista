import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListingLocation } from '../entity/listing-location.entity';
import { CreateListingLocationDto } from '../dto/create-listing-location.dto';

@Injectable()
export class ListingLocationsService {
  constructor(
    @InjectRepository(ListingLocation)
    private listingLocationRepository: Repository<ListingLocation>,
  ) {}

  async create(
    createListingLocationDto: CreateListingLocationDto,
  ): Promise<ListingLocation> {
    const newListingLocation = this.listingLocationRepository.create(
      createListingLocationDto,
    );

    return newListingLocation.save();
  }

  async getAll(): Promise<ListingLocation[]> {
    return this.listingLocationRepository.find();
  }

  async getAllByListingUuid(listingUuid: string): Promise<ListingLocation> {
    return this.listingLocationRepository.findOne({
      where: { listing: { uuid: listingUuid } },
    });
  }
}
