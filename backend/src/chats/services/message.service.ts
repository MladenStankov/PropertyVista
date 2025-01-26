import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../entity/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async createMessage(chatUuid: string, senderId: number, message: string) {
    const newMessage = this.messageRepository.create({
      chat: { uuid: chatUuid },
      sender: { id: senderId },
      message: message,
    });
    return await this.messageRepository.save(newMessage);
  }
}
