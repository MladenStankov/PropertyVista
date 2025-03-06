import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private userService: UsersService) {
    super({
      secretOrKey: `${process.env.JWT_REFRESH_SECRET}`,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          const authHeader = req.headers.authorization;
          if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            if (token) return token;
          }
          return null;
        },
        JwtRefreshStrategy.extractJwt,
      ]),
      ignoreExpiration: false,
    });
  }

  private static extractJwt(req: Request) {
    if (req.cookies && 'refresh_token' in req.cookies) {
      return req.cookies.refresh_token;
    }

    return null;
  }

  async validate(payload: any) {
    const user = await this.userService.findById(payload.userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.password && user.password !== payload.password) {
      throw new UnauthorizedException();
    }
    return {
      attributes: user,
      refreshTokenExpiresAt: new Date(payload.exp * 1000),
    };
  }
}
