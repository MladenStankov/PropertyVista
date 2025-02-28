import { Chat } from 'src/chats/entity/chat.entity';
import { Message } from 'src/chats/entity/message.entity';
import { ListingFavourite } from 'src/listings/entity/listing-favourite.entity';
import { Listing } from 'src/listings/entity/listing.entity';
import { BaseEntity } from 'typeorm';
export declare class User extends BaseEntity {
    id: number;
    fullName: string;
    email: string;
    password?: string;
    imageUrl?: string;
    isVerified: boolean;
    listings: Listing[];
    favourites: ListingFavourite[];
    brokerChats: Chat[];
    homeSeekerChats: Chat[];
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}
