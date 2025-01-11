import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { ChatsService } from './chats.service';
import { UseGuards } from '@nestjs/common';
import { WebSocketGuard } from 'src/auth/guards/web-socket.guard';
import { SendMessageDto } from './dto/send-message.dto';
import { User } from 'src/users/entity/user.entity';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
export class ChatsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatsService) {}

  @UseGuards(WebSocketGuard)
  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody() body: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const senderUser = (client as any).user;
    const senderId = (senderUser as User).id;

    const message = await this.chatService.sendMessage(
      senderId,
      body.receiverId,
      body.message,
    );

    this.server.to(String(body.receiverId)).emit('receiveMessage', message);
  }

  handleConnection(client: Socket): void {
    const userId = client.handshake.query.userId;
    if (userId) {
      client.join(userId);
    }
  }

  handleDisconnect(client: Socket): void {}
}
