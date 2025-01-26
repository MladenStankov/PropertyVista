import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import * as cookie from 'cookie';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtWebsocketMiddleware {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
  ) {}

  async use(socket: Socket, next: (err?: Error) => void) {
    try {
      const cookieHeader = socket.handshake.headers.cookie;
      const cookies = cookie.parse(cookieHeader);

      const acceessToken = cookies['access_token'];

      if (!acceessToken) {
        throw new UnauthorizedException();
      }

      const payload = await this.jwtService.verifyAsync(acceessToken, {
        secret: this.configService.getOrThrow('JWT_SECRET'),
      });

      const user = await this.userService.findById(payload.userId);

      if (!user) {
        throw new UnauthorizedException();
      }
      socket.data.user = user;
      next();
    } catch (err) {
      console.log(err);
      next(new UnauthorizedException('Invalid or expired token'));
    }
  }
}
