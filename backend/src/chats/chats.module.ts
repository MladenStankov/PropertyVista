import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entity/chat.entity';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { Message } from './entity/message.entity';
import { ChatsController } from './chats.controller';
import { ChatService } from './services/chat.service';
import { MessageService } from './services/message.service';
import { ListingsModule } from '../listings/listings.module';
import { User } from '../users/entity/user.entity';
import { ChatsGateway } from './chats.gateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, Message, User]),
    UsersModule,
    AuthModule,
    ListingsModule,
    JwtModule,
  ],
  providers: [ChatService, MessageService, ChatsGateway],
  controllers: [ChatsController],
})
export class ChatsModule {}
