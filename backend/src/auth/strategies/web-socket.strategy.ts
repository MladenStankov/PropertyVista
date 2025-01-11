import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { IJwtTokenPayload } from '../dto/jwt-token.dto';
import { Socket } from 'socket.io';
import * as cookie from 'cookie';

@Injectable()
export class WebSocketStrategy extends PassportStrategy(Strategy, 'ws') {
  constructor(private userService: UsersService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: WebSocketStrategy.extractJwtFromSocket,
      ignoreExpiration: false,
    });
  }

  private static extractJwtFromSocket(socket: Socket): string | null {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      return null;
    }

    const cookies = cookie.parse(cookieHeader);
    return cookies['access_token'] || null;
  }

  async validate(payload: IJwtTokenPayload): Promise<any> {
    const user = await this.userService.findById(payload.userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
