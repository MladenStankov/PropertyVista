import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Chat } from '../entity/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessagesDto } from '../dto/chat-messages.dto';
import { ListingsService } from 'src/listings/services/listings.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entity/user.entity';
import { ChatDto } from '../dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    private listingsService: ListingsService,
    private userService: UsersService,
  ) {}

  async createChat(homeSeekerId: number, listingUuid: string) {
    const listing = await this.listingsService.findByUuid(listingUuid);
    if (listing == null) throw new BadRequestException('Listing not found.');
    const brokerId = listing.user.id;

    if (brokerId === homeSeekerId)
      throw new BadRequestException('You cannot chat with yourself.');

    const broker = await this.userService.findById(brokerId);
    if (broker == null) throw new BadRequestException('Broker not found.');

    const homeSeeker = await this.userService.findById(homeSeekerId);
    if (homeSeeker == null)
      throw new BadRequestException('Home Seeker not found.');

    const existingChat = await this.chatRepository.findOne({
      where: {
        broker: { id: brokerId },
        homeSeeker: { id: homeSeekerId },
      },
    });

    if (existingChat) {
      return { uuid: existingChat.uuid };
    }

    const chat = this.chatRepository.create({
      broker: broker as User,
      homeSeeker: homeSeeker as User,
      listing,
    });
    return { uuid: (await this.chatRepository.save(chat)).uuid };
  }

  async getChats(userId: number): Promise<ChatDto> {
    const brokerChats = await this.chatRepository.find({
      where: [{ broker: { id: userId } }],
      relations: ['homeSeeker', 'messages', 'messages.sender'],
    });
    const homeSeekingChats = await this.chatRepository.find({
      where: [{ homeSeeker: { id: userId } }],
      relations: [
        'listing',
        'listing.images',
        'listing.location',
        'messages',
        'messages.sender',
      ],
    });

    return {
      brokerChats: brokerChats.map((chat) => ({
        uuid: chat.uuid,
        homeSeekerImage: chat.homeSeeker.imageUrl,
        homeSeekerFullName: chat.homeSeeker.fullName,
        lastMessage:
          chat.messages[chat.messages.length - 1]?.message || 'No messages yet',
        lastMessageBy:
          chat.messages[chat.messages.length - 1]?.sender.fullName || '',
      })),
      homeSeekingChats: homeSeekingChats.map((chat) => ({
        uuid: chat.uuid,
        listingImageUrl: chat.listing.images[0].imageUrl,
        listingAddress: `${chat.listing.location.streetName} ${chat.listing.location.streetNumber} ${chat.listing.location.postalCode} ${chat.listing.location.city} ${chat.listing.location.country}`,
        lastMessage:
          chat.messages[chat.messages.length - 1]?.message || 'No messages yet',
        lastMessageBy:
          chat.messages[chat.messages.length - 1]?.sender.fullName || '',
      })),
    };
  }

  async getChatMessages(
    chatUuid: string,
    currentUserId: number,
  ): Promise<ChatMessagesDto[]> {
    const chat = await this.chatRepository.findOne({
      where: { uuid: chatUuid },
      relations: ['messages', 'messages.sender'],
    });

    const groupedMessages: ChatMessagesDto[] = [];

    chat.messages
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
      .reduce((acc, current) => {
        const lastGroup = acc[acc.length - 1];

        if (lastGroup && lastGroup.userFullName === current.sender.fullName) {
          lastGroup.messages.push({
            message: current.message,
            createdAt: current.createdAt,
          });
        } else {
          acc.push({
            userFullName: current.sender.fullName,
            userImage: current.sender.imageUrl,
            currentUser: current.sender.id === currentUserId,
            messages: [
              {
                message: current.message,
                createdAt: current.createdAt,
              },
            ],
          });
        }
        return acc;
      }, groupedMessages);

    return groupedMessages;
  }
}
