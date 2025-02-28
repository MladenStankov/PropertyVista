import { BaseEntity } from 'typeorm';
import { Listing } from './listing.entity';
export declare class ListingView extends BaseEntity {
    id: number;
    listing: Listing;
    createdAt: Date;
}
