import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { LocalStrategy } from './strategies/local-strategy';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { JwtGuard } from './guards/jwt.guard';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { EmailSendingModule } from '../email-sending/email-sending.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRefreshToken } from './entity/auth-refresh-token.entity';
import { AuthRefreshTokenService } from './services/auth-refresh-token.service';
import { JwtOptionalGuard } from './guards/jwt-optional.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRefreshToken]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '30m' },
    }),
    forwardRef(() => EmailSendingModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    LocalStrategy,
    JwtGuard,
    JwtOptionalGuard,
    GoogleStrategy,
    GoogleOAuthGuard,
    AuthRefreshTokenService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [JwtGuard, AuthService, JwtOptionalGuard],
})
export class AuthModule {}
