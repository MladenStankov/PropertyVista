import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListingAmenity } from '../entity/listing-amenity.entity';
import { Repository } from 'typeorm';
import { ListingAmenityDto } from '../dto/listing-amenity.dto';

@Injectable()
export class ListingAmenitiesService {
  constructor(
    @InjectRepository(ListingAmenity)
    private listingAmenityRepository: Repository<ListingAmenity>,
  ) {}

  async create(AmenityDto: ListingAmenityDto): Promise<ListingAmenity> {
    const newListingAmenity = this.listingAmenityRepository.create(AmenityDto);

    return newListingAmenity.save();
  }

  async delete(amenity: ListingAmenity): Promise<void> {
    if (amenity) {
      this.listingAmenityRepository.delete({ id: amenity.id });
    }
  }

  async getAllByListingUuid(listingUuid: string): Promise<ListingAmenity[]> {
    return this.listingAmenityRepository.find({
      where: { listing: { uuid: listingUuid } },
    });
  }
}
