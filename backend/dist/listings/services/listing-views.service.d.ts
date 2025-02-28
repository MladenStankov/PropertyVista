import { Repository } from 'typeorm';
import { ListingView } from '../entity/listing-view.entity';
import { Listing } from '../entity/listing.entity';
export declare class ListingViewsService {
    private listingViewRepository;
    constructor(listingViewRepository: Repository<ListingView>);
    create(listing: Listing): Promise<ListingView>;
    getNumberOfViews(listing: Listing): Promise<number>;
}
