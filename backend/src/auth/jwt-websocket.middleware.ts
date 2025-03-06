import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import * as cookie from 'cookie';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtWebsocketMiddleware {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
  ) {}

  async use(socket: Socket, next: (err?: Error) => void) {
    try {
      // Try to get token from handshake auth
      let token = socket.handshake.auth?.token;

      // If not found, try to get from cookies
      if (!token && socket.handshake.headers.cookie) {
        const cookies = cookie.parse(socket.handshake.headers.cookie);
        token = cookies['access_token'];
      }

      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      const payload = await this.jwtService.verifyAsync(token, {
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
