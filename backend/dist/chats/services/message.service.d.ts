import { Message } from '../entity/message.entity';
import { Repository } from 'typeorm';
export declare class MessageService {
    private messageRepository;
    constructor(messageRepository: Repository<Message>);
    createMessage(chatUuid: string, senderId: number, message: string): Promise<Message>;
}
