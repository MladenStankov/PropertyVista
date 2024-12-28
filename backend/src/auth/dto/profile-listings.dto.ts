import { ListingType } from 'src/listings/types/listing-type.dto';

export interface ProfileListings {
  uuid: string;
  imageUrl: string;
  createdAt: Date;
  price: number;
  type: ListingType;
  views: number;
  favourites: number;
}
