import { Module } from '@nestjs/common';
import { AuthRefreshTokenService } from './auth-refresh-token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthRefreshToken } from './entity/auth-refresh-token.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRefreshToken]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '30m' },
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [AuthRefreshTokenService],
  exports: [AuthRefreshTokenService],
})
export class AuthRefreshTokenModule {}
