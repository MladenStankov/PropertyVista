import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalGuard } from './guards/local.guard';
import { Request, Response } from 'express';
import { JwtGuard } from './guards/jwt.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { Throttle } from '@nestjs/throttler';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { EmailSendingService } from 'src/email-sending/email-sending.service';
import { User } from 'src/users/entity/user.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailSendingService: EmailSendingService,
  ) {}
  @Post('/register')
  async register(@Body() registerPayload: CreateUserDto) {
    const { email } = await this.authService.register(registerPayload);
    return this.emailSendingService.sendUserVerificationEmail(email);
  }

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalGuard)
  @Post('/login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(res, req);
  }

  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @UseGuards(JwtGuard)
  @Get('/profile')
  async profile(@Req() req: Request) {
    const { id, fullName, email, imageUrl, phoneNumber } = req.user as User;
    return { id, fullName, email, imageUrl, phoneNumber };
  }

  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @UseGuards(JwtRefreshGuard)
  @Post('/refresh-tokens')
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refreshTokens(req, res);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }

  @Get('/google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Get('/google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthCallBack(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.googleLogin(req, res);
    res.redirect('http://localhost:5173');
  }
}
