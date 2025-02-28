import { ListingType } from '../types/listing-type.dto';
export interface MostViewedListingsDto {
    uuid: string;
    price: number;
    location: string;
    imageUrl: string;
    type: ListingType;
}
