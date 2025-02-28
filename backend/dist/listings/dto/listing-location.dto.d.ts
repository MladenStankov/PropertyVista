import { Listing } from '../entity/listing.entity';
export declare class ListingLocationDto {
    streetNumber: string;
    streetName: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    longitude: number;
    latitude: number;
    listing?: Listing;
}
