import { BaseEntity } from 'typeorm';
import { Listing } from './listing.entity';
import { User } from 'src/users/entity/user.entity';
export declare class ListingFavourite extends BaseEntity {
    id: number;
    listing: Listing;
    user: User;
}
