import { ListingDto } from './listing.dto';
import { ListingLocationDto } from './listing-location.dto';
import { ListingImageDto } from './listing-image.dto';
import { ListingAmenityDto } from './listing-amenity.dto';
import { ListingRoomDto } from './listing-room.dto';
export declare class PublishListingDto {
    listing: ListingDto;
    location: ListingLocationDto;
    images: ListingImageDto[];
    amenities?: ListingAmenityDto[];
    rooms?: ListingRoomDto[];
}
