import { ChatService } from './services/chat.service';
import { MessageService } from './services/message.service';
export declare class ChatsController {
    private chatService;
    private messageService;
    constructor(chatService: ChatService, messageService: MessageService);
    createChat(req: Request, listingUuid: string): Promise<{
        uuid: string;
    }>;
    getChats(req: Request): Promise<import("./dto/chat.dto").ChatDto>;
    getChatMessages(uuid: string, req: Request): Promise<import("./dto/chat-messages.dto").ChatMessagesDto[]>;
}
