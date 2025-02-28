import { BaseEntity } from 'typeorm';
import { RoomType } from '../types/room-type.dto';
import { Listing } from './listing.entity';
export declare class ListingRoom extends BaseEntity {
    id: number;
    type: RoomType;
    amount: number;
    listing: Listing;
}
