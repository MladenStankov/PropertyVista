import { ConstructionType } from '../types/construction-type.dto';
import { ListingType } from '../types/listing-type.dto';

export interface IListing {
  uuid: string;

  address: string;

  imageUrl: string;

  type: ListingType;

  constructionType: ConstructionType;

  numberOfBedrooms: number;

  numberOfBathrooms: number;

  numberOfFloors: number;

  surfaceArea: number;

  price: number;
}
