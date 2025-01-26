import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './services/chat.service';
import { MessageService } from './services/message.service';
import { JwtWebsocketMiddleware } from 'src/auth/jwt-websocket.middleware';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { use } from 'passport';

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
})
export class ChatsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private chatService: ChatService,
    private messageService: MessageService,
  ) {}

  @SubscribeMessage('sendMessage')
  async sendMessage(
    client: Socket,
    data: { chatUuid: string; message: string },
  ) {
    if (!client.rooms.has(data.chatUuid)) {
      return client.emit('error');
    }

    try {
      const message = await this.messageService.createMessage(
        data.chatUuid,
        client.data.user.id,
        data.message,
      );

      const responseData = {
        message: message.message,
        createdAt: message.createdAt,
        currentUser: message.sender.id === client.data.user.id,
        userFullName: client.data.user.fullName,
        userImage: client.data.user.imageUrl,
        chatUuid: message.chat.uuid,
      };

      this.server.to(data.chatUuid).emit('receiveMessage', { ...responseData });
      console.log('bravo');
    } catch (error) {
      client.emit('error', error.message);
    }
  }

  async afterInit(): Promise<void> {
    this.server.use((socket: Socket, next) => {
      const middleware = new JwtWebsocketMiddleware(
        this.jwtService,
        this.configService,
        this.userService,
      );
      middleware.use(socket, next);
    });
  }

  async handleConnection(client: Socket): Promise<void> {
    console.log('Client connected:', client.id);

    const userChats = await this.chatService.getChats(client.data.user.id);

    userChats.brokerChats.forEach((chat) => {
      client.join(chat.uuid);
    });

    userChats.homeSeekingChats.forEach((chat) => {
      client.join(chat.uuid);
    });
  }

  handleDisconnect(client: Socket): void {
    console.log('Client disconnected:', client.id);
  }
}
