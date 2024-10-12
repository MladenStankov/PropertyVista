import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { EmailSendingService } from './email-sending.service';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('email-sending')
@ApiTags('Email Sending')
export class EmailSendingController {
  constructor(
    private emailSendingService: EmailSendingService,
    private authService: AuthService,
  ) {}

  @Get('/verify-email/:token')
  async verifyEmail(
    @Param('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user =
      await this.emailSendingService.validateUserVerificationToken(token);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isVerified = true;
    await user.save();

    return this.authService.login(res, null, user);
  }
}
