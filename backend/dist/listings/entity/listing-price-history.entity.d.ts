import { Listing } from './listing.entity';
export declare class ListingPriceHistory {
    id: number;
    price: number;
    listing: Listing;
    createdAt: Date;
}
