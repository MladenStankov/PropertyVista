import { BaseEntity } from 'typeorm';
import { Listing } from './listing.entity';
export declare class ListingImage extends BaseEntity {
    id: number;
    imageUrl: string;
    listing: Listing;
}
