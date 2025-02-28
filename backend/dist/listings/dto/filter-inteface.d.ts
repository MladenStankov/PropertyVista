import { AmenityType } from '../types/amenity-type.dto';
import { ConstructionType } from '../types/construction-type.dto';
import { ListingType } from '../types/listing-type.dto';
export interface IFilter {
    type?: ListingType | null;
    minPrice?: number | null;
    maxPrice?: number | null;
    constructionType?: ConstructionType | null;
    minSurfaceArea?: number | null;
    maxSurfaceArea?: number | null;
    minYear?: number | null;
    maxYear?: number | null;
    minBedrooms?: number | null;
    maxBedrooms?: number | null;
    minBathrooms?: number | null;
    maxBathrooms?: number | null;
    minOtherRooms?: number | null;
    maxOtherRooms?: number | null;
    minFloors?: number | null;
    maxFloors?: number | null;
    amenities?: AmenityType[];
}
