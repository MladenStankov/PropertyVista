import { BaseEntity } from 'typeorm';
import { AmenityType } from '../types/amenity-type.dto';
import { Listing } from './listing.entity';
export declare class ListingAmenity extends BaseEntity {
    id: number;
    type: AmenityType;
    listing: Listing;
}
