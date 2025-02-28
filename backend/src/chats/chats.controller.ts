import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './services/chat.service';
import { MessageService } from './services/message.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('chats')
@ApiTags('Chats')
export class ChatsController {
  constructor(
    private chatService: ChatService,
    private messageService: MessageService,
  ) {}

  @Post(':listingUuid')
  @UseGuards(JwtGuard)
  async createChat(
    @Req() req: Request,
    @Param('listingUuid') listingUuid: string,
  ) {
    return this.chatService.createChat((req as any).user.id, listingUuid);
  }

  @Get()
  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @UseGuards(JwtGuard)
  async getChats(@Req() req: Request) {
    return this.chatService.getChats((req as any).user.id);
  }

  @Get(':uuid')
  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @UseGuards(JwtGuard)
  async getChatMessages(@Param('uuid') uuid: string, @Req() req: Request) {
    return this.chatService.getChatMessages(uuid, (req as any).user.id);
  }
}
