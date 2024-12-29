import { AmenityType } from '../types/amenity-type.dto';
import { ConstructionType } from '../types/construction-type.dto';
import { ListingType } from '../types/listing-type.dto';

export interface IGeneralInformation {
  type: ListingType;
  price: string;
  constructionType: ConstructionType;
  surfaceArea: string;
  constructionYear: string;
  description: string;
}

export interface IArea {
  numberOfBedrooms: string;
  numberOfBathrooms: string;
  numberOfOtherRooms: string;
  numberOfFloors: string;
}

export interface IAddress {
  streetNumber: string;
  streetName: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
}

export interface IGeoLocation {
  longitude: number;
  latitude: number;
}

export interface IForEditing {
  address: IAddress;
  location: IGeoLocation;
  general: IGeneralInformation;
  images: string[];
  rooms: IArea;
  amenities: AmenityType[];
}
