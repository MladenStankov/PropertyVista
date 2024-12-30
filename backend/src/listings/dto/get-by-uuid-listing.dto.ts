import { AmenityType } from '../types/amenity-type.dto';
import { ConstructionType } from '../types/construction-type.dto';
import { ListingType } from '../types/listing-type.dto';

export interface IListingExtended {
  userId: number;

  userFullName: string;

  userImage: string;

  address: string;

  images: string[];

  type: ListingType;

  constructionType: ConstructionType;

  numberOfBedrooms: number;

  numberOfBathrooms: number;

  numberOfOtherRooms: number;

  numberOfFloors: number;

  surfaceArea: number;

  price: number;

  description: string;

  amenities: AmenityType[];

  longitude: number;

  latitude: number;

  constructionYear: number;

  isFavourited: boolean;
}
