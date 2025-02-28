import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalGuard } from './guards/local.guard';
import { Request, Response } from 'express';
import { JwtGuard } from './guards/jwt.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { Throttle } from '@nestjs/throttler';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { EmailSendingService } from '../email-sending/email-sending.service';
import { User } from '../users/entity/user.entity';
import { ConfigService } from '@nestjs/config';
import { ChangeNameDto } from './dto/change-name.dto';
import { ChangeImageDto } from './dto/change-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailSendingService: EmailSendingService,
    private configService: ConfigService,
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

  // @Throttle({ default: { limit: 1000, ttl: 1000 } })
  @UseGuards(JwtGuard)
  @Get('/profile')
  async profile(@Req() req: Request) {
    const { id, fullName, email, imageUrl } = req.user as User;
    return { id, fullName, email, imageUrl };
  }

  // @Throttle({ default: { limit: 3, ttl: 500 } })
  @UseGuards(JwtRefreshGuard)
  @Post('/refresh-tokens')
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshTokens(req, res);
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
    res.redirect(`${this.configService.get<string>('FRONTEND_URL')}`);
  }

  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @UseGuards(JwtGuard)
  @Get('/profile-info')
  async profileInfo(@Req() req: Request) {
    return this.authService.profileInfo(req);
  }

  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @UseGuards(JwtGuard)
  @Get('/profile-listings')
  async profileListings(@Req() req: Request) {
    return this.authService.profileListings(req);
  }

  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @UseGuards(JwtGuard)
  @Get('/profile-favourite-listings')
  async profileFavouriteListings(@Req() req: Request) {
    return this.authService.profileFavouriteListings(req);
  }

  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @UseGuards(JwtGuard)
  @Put('/change-name')
  async changeName(@Body() changeNameDto: ChangeNameDto, @Req() req: Request) {
    return this.authService.changeName(
      changeNameDto.fullName,
      req.user as User,
    );
  }

  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @UseGuards(JwtGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update the image',
    type: ChangeImageDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  @Put('/change-image')
  async changeImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<{ newImage: string }> {
    return this.authService.changeImage(file, req.user as User);
  }
}
