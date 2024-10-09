import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalGuard } from './guards/local.guard';
import { Request, Response } from 'express';
import { JwtGuard } from './guards/jwt.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { Throttle } from '@nestjs/throttler';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  async register(@Body() registerPayload: CreateUserDto) {
    return this.authService.register(registerPayload);
  }

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalGuard)
  @Post('/login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(req, res);
  }

  @Throttle({ default: { limit: 10, ttl: 1000 } })
  @UseGuards(JwtGuard)
  @Get('/profile')
  async profile(@Req() req: Request) {
    return req.user;
  }

  @Throttle({ default: { limit: 3, ttl: 1000 } })
  @UseGuards(JwtRefreshGuard)
  @Put('/refresh-tokens')
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshTokens(req, res);
  }

  @UseGuards(JwtRefreshGuard)
  @Put('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }

  // @Get('/google')
  // @UseGuards(GoogleOAuthGuard)
  // async googleAuth() {}

  // @Get('/google/callback')
  // @UseGuards(GoogleOAuthGuard)
  // async googleAuthCallBack(
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   await this.authService.googleLogin(req);

  //   const { accessToken, refreshToken } = req.user as any;

  //   res.cookie('access_token', accessToken, { httpOnly: true });
  //   res.cookie('refresh_token', refreshToken, { httpOnly: true });
  // }
}
