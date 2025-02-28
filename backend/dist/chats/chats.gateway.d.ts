import { Server, Socket } from 'socket.io';
import { ChatService } from './services/chat.service';
import { MessageService } from './services/message.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
export declare class ChatsGateway {
    private readonly jwtService;
    private readonly configService;
    private readonly userService;
    private chatService;
    private messageService;
    server: Server;
    constructor(jwtService: JwtService, configService: ConfigService, userService: UsersService, chatService: ChatService, messageService: MessageService);
    sendMessage(client: Socket, data: {
        chatUuid: string;
        message: string;
    }): Promise<boolean>;
    afterInit(): Promise<void>;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
}
