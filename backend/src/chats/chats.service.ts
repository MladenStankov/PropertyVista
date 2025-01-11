import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entity/chat.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { GetChatsDto } from './dto/get-chats.dto';
import { GetChatHistoryDto, MessageType } from './dto/get-chat-history.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    private userService: UsersService,
  ) {}

  async getChats(userId: number): Promise<GetChatsDto[]> {
    const chats = await this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.sender', 'sender')
      .leftJoinAndSelect('chat.receiver', 'receiver')
      .where('chat.senderId = :userId OR chat.receiverId = :userId', { userId })
      .andWhere('chat.senderId != chat.receiverId')
      .select([
        'chat.id',
        'chat.createdAt',
        'chat.senderId',
        'chat.receiverId',
        'sender.id',
        'sender.fullName',
        'sender.imageUrl',
        'receiver.id',
        'receiver.fullName',
        'receiver.imageUrl',
      ])
      .distinctOn(['chat.senderId', 'chat.receiverId'])
      .orderBy('chat.senderId')
      .addOrderBy('chat.receiverId')
      .addOrderBy('chat.createdAt', 'DESC')
      .getMany();

    return chats.map((chat) => {
      const otherUser = chat.sender.id === userId ? chat.receiver : chat.sender;
      return {
        userId: otherUser.id,
        userName: otherUser.fullName,
        userImage: otherUser.imageUrl,
      };
    });
  }

  async getChatHistory(
    leftUser: number,
    rightUser: number,
  ): Promise<GetChatHistoryDto[]> {
    const chats = await this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.sender', 'sender')
      .leftJoinAndSelect('chat.receiver', 'receiver')
      .where(
        '(chat.senderId = :leftUser AND chat.receiverId = :rightUser) OR (chat.senderId = :rightUser AND chat.receiverId = :leftUser)',
        { leftUser, rightUser },
      )
      .andWhere('chat.senderId != chat.receiverId')
      .select([
        'chat.id',
        'chat.createdAt',
        'chat.senderId',
        'chat.receiverId',
        'sender.id',
        'sender.fullName',
        'sender.imageUrl',
        'receiver.id',
        'receiver.fullName',
        'receiver.imageUrl',
        'chat.message',
      ])
      .addOrderBy('chat.createdAt', 'ASC')
      .getMany();

    return chats.map((chat) => ({
      messageType:
        chat.sender.id === leftUser ? MessageType.LEFT : MessageType.RIGHT,
      message: chat.message,
      createdAt: chat.createdAt,
    }));
  }

  async sendMessage(senderId: number, receiverId: number, message: string) {
    const newMessage = this.chatRepository.create({
      sender: { id: senderId },
      receiver: { id: receiverId },
      message: message,
    });
    return this.chatRepository.save(newMessage);
  }
}
