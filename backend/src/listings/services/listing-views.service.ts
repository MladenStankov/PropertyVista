import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListingView } from '../entity/listing-view.entity';
import { Listing } from '../entity/listing.entity';

@Injectable()
export class ListingViewsService {
  constructor(
    @InjectRepository(ListingView)
    private listingViewRepository: Repository<ListingView>,
  ) {}

  async create(listing: Listing): Promise<ListingView> {
    const newListingView = this.listingViewRepository.create({
      listing,
    });

    return this.listingViewRepository.save(newListingView);
  }

  async getNumberOfViews(listingUuid: string): Promise<number> {
    return (
      await this.listingViewRepository.find({
        where: { listing: { uuid: listingUuid } },
      })
    ).length;
  }
}
