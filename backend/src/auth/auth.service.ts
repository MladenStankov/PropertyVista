import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { AuthRefreshTokenService } from 'src/auth-refresh-token/auth-refresh-token.service';
import { CookieOptions, Request, Response } from 'express';
import { User } from 'src/users/entity/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: 30 * 24 * 60 * 60 * 1000,
  sameSite: 'strict',
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private authRefreshTokenService: AuthRefreshTokenService,
  ) {}

  async register(registerPayload: CreateUserDto) {
    const { email } = registerPayload;
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    return await this.userService.create(registerPayload);
  }

  async login(res: Response, req?: Request, user?: User) {
    const { access_token, refresh_token } =
      await this.authRefreshTokenService.generateTokenPair(
        req ? (req.user as User) : user,
      );

    res.cookie('access_token', access_token, cookieOptions);
    res.cookie('refresh_token', refresh_token, cookieOptions);
  }

  async validateUser(loginPayload: LoginDto) {
    const { email, password } = loginPayload;
    const existingUser = await this.userService.findByEmail(email);

    if (!existingUser) {
      throw new UnauthorizedException();
    }

    if (!(await compare(password, existingUser.password))) {
      throw new UnauthorizedException();
    }

    if (!existingUser.isVerified) {
      throw new UnauthorizedException('User is not verified');
    }

    return existingUser;
  }

  async refreshTokens(req: Request, res: Response) {
    const { access_token, refresh_token } =
      await this.authRefreshTokenService.generateTokenPair(
        (req.user as any).attributes as User,
        req.cookies.refresh_token as string,
        (req.user as any).refreshTokenExpiresAt as Date,
      );

    res.cookie('access_token', access_token, cookieOptions);
    res.cookie('refresh_token', refresh_token, cookieOptions);
  }

  async logout(req: Request, res: Response) {
    await this.authRefreshTokenService.blacklistRefreshToken(
      req.cookies.refresh_token as string,
      (req.user as any).refreshTokenExpiresAt as Date,
      ((req.user as any).attributes as User).id,
    );

    res.clearCookie('access_token', cookieOptions);
    res.clearCookie('refresh_token', cookieOptions);
  }

  // async googleLogin(req: Request) {
  //   const { googleId, firstName, familyName, email, picture } = req.user as any;

  //   const CreateGoogleUserDto = {
  //     googleId,
  //     firstName,
  //     familyName,
  //     email,
  //     picture,
  //   };

  //   return await this.userService.createGoogleAccount(CreateGoogleUserDto);
  // }
}
