import { forwardRef, Module } from '@nestjs/common';
import { EmailSendingService } from './email-sending.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVerificationEmail } from './entity/user-verification-email.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersModule } from 'src/users/users.module';
import { ConfigService } from '@nestjs/config';
import { EmailSendingController } from './email-sending.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserVerificationEmail]),
    UsersModule,
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          auth: {
            user: configService.get<string>('EMAIL_USERNAME'),
            pass: configService.get<string>('EMAIL_PASSWORD'),
          },
        },
      }),
    }),
  ],
  providers: [EmailSendingService],
  exports: [EmailSendingService],
  controllers: [EmailSendingController],
})
export class EmailSendingModule {}
