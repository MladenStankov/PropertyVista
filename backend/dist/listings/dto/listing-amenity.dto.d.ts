import { AmenityType } from '../types/amenity-type.dto';
import { Listing } from '../entity/listing.entity';
export declare class ListingAmenityDto {
    type: AmenityType;
    listing?: Listing;
}
