import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { IJwtTokenPayload } from '../dto/jwt-token.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UsersService) {
    super({
      secretOrKey: `${process.env.JWT_SECRET}`,
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJwt]),
      ignoreExpiration: false,
    });
  }

  private static extractJwt(req: Request) {
    if (req.cookies && 'access_token' in req.cookies) {
      return req.cookies.access_token;
    }

    return null;
  }

  async validate(payload: IJwtTokenPayload): Promise<User | null> {
    const user = await this.userService.findById(payload.userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.password && user.password !== payload.password) {
      throw new UnauthorizedException('Session expired');
    }

    return user;
  }
}
