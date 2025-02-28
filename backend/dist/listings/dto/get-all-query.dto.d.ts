import { SortType } from '../types/sort-type.type';
import { AmenityType } from '../types/amenity-type.dto';
import { ConstructionType } from '../types/construction-type.dto';
import { ListingType } from '../types/listing-type.dto';
export declare class GetAllQueryDto {
    search?: string;
    type?: ListingType;
    minPrice?: number;
    maxPrice?: number;
    constructionType?: ConstructionType;
    minSurfaceArea?: number;
    maxSurfaceArea?: number;
    minYear?: number;
    maxYear?: number;
    minBedrooms?: number;
    maxBedrooms?: number;
    minBathrooms?: number;
    maxBathrooms?: number;
    minOtherRooms?: number;
    maxOtherRooms?: number;
    minFloors?: number;
    maxFloors?: number;
    amenities?: AmenityType[];
    sort?: SortType;
}
