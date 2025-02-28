import { Listing } from 'src/listings/entity/listing.entity';
import { User } from 'src/users/entity/user.entity';
import { BaseEntity } from 'typeorm';
import { Message } from './message.entity';
export declare class Chat extends BaseEntity {
    uuid: string;
    listing: Listing;
    broker: User;
    homeSeeker: User;
    messages: Message[];
    createdAt: Date;
}
