import { ListingDto } from './listing.dto';
import { ListingLocationDto } from './listing-location.dto';
import { ListingImageDto } from './listing-image.dto';
import { ListingAmenityDto } from './listing-amenity.dto';
import { ListingRoomDto } from './listing-room.dto';
import { DeletedImagesDto } from './deleted-image.dto';
export declare class UpdateListingDto {
    listing: Partial<ListingDto>;
    location: Partial<ListingLocationDto>;
    images: ListingImageDto[];
    deletedImages?: DeletedImagesDto[];
    amenities?: ListingAmenityDto[];
    deletedAmenities?: ListingAmenityDto[];
    rooms?: ListingRoomDto[];
}
