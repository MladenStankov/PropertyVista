import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { EmailSendingModule } from './email-sending/email-sending.module';
import { AwsModule } from './aws/aws.module';
import { ListingsModule } from './listings/listings.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CalculatorModule } from './calculator/calculator.module';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.NODE_ENV === 'production',
    }),
    AuthModule,
    ThrottlerModule.forRoot(),
    EmailSendingModule,
    AwsModule,
    ListingsModule,
    CalculatorModule,
    ChatsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
