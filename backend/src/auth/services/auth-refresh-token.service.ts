import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRefreshToken } from '../entity/auth-refresh-token.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../../users/entity/user.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IJwtTokenPayload } from '../dto/jwt-token.dto';

@Injectable()
export class AuthRefreshTokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(AuthRefreshToken)
    private authRefreshTokenRepository: Repository<AuthRefreshToken>,
  ) {}

  private isRefreshTokenBlackListed(refreshToken: string, userId: number) {
    return this.authRefreshTokenRepository.existsBy({ refreshToken, userId });
  }

  async blacklistRefreshToken(
    refreshToken: string,
    expiresAt: Date,
    userId: number,
  ) {
    await this.authRefreshTokenRepository.insert({
      refreshToken,
      expiresAt,
      userId,
    });
  }

  async generateRefreshToken(
    user: User,
    currentRefreshToken?: string,
    currentRefreshTokenExpiresAt?: Date,
  ) {
    const payload: IJwtTokenPayload = {
      userId: user.id,
      password: user.password,
      date: Date.now(),
    };

    const newRefreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '30d',
    });

    if (currentRefreshToken && currentRefreshTokenExpiresAt) {
      if (await this.isRefreshTokenBlackListed(currentRefreshToken, user.id)) {
        throw new UnauthorizedException('Invalid refresh token.');
      }

      await this.blacklistRefreshToken(
        currentRefreshToken,
        currentRefreshTokenExpiresAt,
        user.id,
      );
    }

    return newRefreshToken;
  }

  async generateTokenPair(
    user: User,
    currentRefreshToken?: string,
    currentRefreshTokenExpiresAt?: Date,
  ) {
    const payload: IJwtTokenPayload = {
      userId: user.id,
      password: user.password,
      date: Date.now(),
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
      refresh_token: await this.generateRefreshToken(
        user,
        currentRefreshToken,
        currentRefreshTokenExpiresAt,
      ),
    };
  }

  @Cron(CronExpression.EVERY_10_HOURS)
  async deleteExpiredRefreshTokens() {
    await this.authRefreshTokenRepository.delete({
      expiresAt: LessThanOrEqual(new Date()),
    });
  }
}
