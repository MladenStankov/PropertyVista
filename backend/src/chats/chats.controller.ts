import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { User } from 'src/users/entity/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@Controller('chats')
@ApiTags('Chats')
export class ChatsController {
  constructor(private chatService: ChatsService) {}

  @Get()
  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @UseGuards(JwtGuard)
  async getChats(@Req() req: Request) {
    return this.chatService.getChats((req.user as User).id);
  }

  @Get('/history/:userId')
  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @UseGuards(JwtGuard)
  async getChatHistory(@Param('userId') userId: number, @Req() req: Request) {
    return this.chatService.getChatHistory(userId, (req.user as User).id);
  }
}
