import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { LocalStrategy } from './strategies/local-strategy';
import { AuthRefreshTokenModule } from 'src/auth-refresh-token/auth-refresh-token.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { JwtGuard } from './guards/jwt.guard';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { EmailSendingModule } from 'src/email-sending/email-sending.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '30m' },
    }),
    AuthRefreshTokenModule,
    forwardRef(() => EmailSendingModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    LocalStrategy,
    JwtGuard,
    GoogleStrategy,
    GoogleOAuthGuard,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [JwtGuard, AuthService],
})
export class AuthModule {}
