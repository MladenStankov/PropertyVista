import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { EmailSendingService } from './email-sending.service';
import { Response } from 'express';
import { AuthService } from '../auth/services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { ValidatePasswordReset } from './dto/validate-password-reset.dto';
import { SendPasswordResetDto } from './dto/send-password-reset.dto';
import { ConfigService } from '@nestjs/config';

@Controller('email-sending')
@ApiTags('Email Sending')
export class EmailSendingController {
  constructor(
    private emailSendingService: EmailSendingService,
    private authService: AuthService,
    private configService: ConfigService,
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

    await this.authService.login(res, null, user);
    res.redirect(`${this.configService.get<string>('FRONTEND_URL')}`);
  }

  @Post('/password-forgot')
  async sendPasswordReset(@Body() sendPasswordResetDto: SendPasswordResetDto) {
    return await this.emailSendingService.sendPasswordResetEmail(
      sendPasswordResetDto.email,
    );
  }

  @Post('/password-reset')
  async validatePasswordReset(
    @Body() validatePasswordResetDto: ValidatePasswordReset,
  ) {
    return await this.emailSendingService.validatePasswordReset(
      validatePasswordResetDto.token,
      validatePasswordResetDto.password,
    );
  }
}
