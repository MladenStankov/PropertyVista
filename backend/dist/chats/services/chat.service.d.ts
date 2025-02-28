import { Repository } from 'typeorm';
import { Chat } from '../entity/chat.entity';
import { ChatMessagesDto } from '../dto/chat-messages.dto';
import { ListingsService } from 'src/listings/services/listings.service';
import { UsersService } from 'src/users/users.service';
import { ChatDto } from '../dto/chat.dto';
export declare class ChatService {
    private chatRepository;
    private listingsService;
    private userService;
    constructor(chatRepository: Repository<Chat>, listingsService: ListingsService, userService: UsersService);
    createChat(homeSeekerId: number, listingUuid: string): Promise<{
        uuid: string;
    }>;
    getChats(userId: number): Promise<ChatDto>;
    getChatMessages(chatUuid: string, currentUserId: number): Promise<ChatMessagesDto[]>;
}
