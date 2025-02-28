import { Listing } from '../entity/listing.entity';
import { RoomType } from '../types/room-type.dto';
export declare class ListingRoomDto {
    type: RoomType;
    amount: number;
    listing?: Listing;
}
