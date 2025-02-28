import { BaseEntity } from 'typeorm';
import { Chat } from './chat.entity';
import { User } from 'src/users/entity/user.entity';
export declare class Message extends BaseEntity {
    id: string;
    message: string;
    chat: Chat;
    sender: User;
    createdAt: Date;
}
