import { BaseEntity } from 'typeorm';
import { Listing } from './listing.entity';
export declare class ListingLocation extends BaseEntity {
    id: number;
    streetNumber: string;
    streetName: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    longitude: number;
    latitude: number;
    listing: Listing;
}
