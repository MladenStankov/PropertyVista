import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, LessThanOrEqual, Repository } from 'typeorm';
import { UserVerification } from './entity/user-verification-email.entity';
import * as crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from '../users/users.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PasswordReset } from './entity/password-reset-email.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailSendingService {
  constructor(
    @InjectRepository(UserVerification)
    private readonly userVerificationRepository: Repository<UserVerification>,
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: Repository<PasswordReset>,
    private mailerService: MailerService,
    private userService: UsersService,
    private configService: ConfigService,
  ) {}

  private async generateRandomToken(): Promise<string> {
    return crypto.randomBytes(20).toString('hex');
  }

  private async createUserVerificationEmail(
    userEmail: string,
  ): Promise<string> {
    let token: string;

    if (!this.userService.existsByEmail(userEmail)) {
      throw new NotFoundException('User does not exist.');
    }
    const user = await this.userService.findByEmail(userEmail);

    if (user && user.isVerified) {
      throw new UnauthorizedException('User already verified');
    }

    do {
      token = await this.generateRandomToken();
    } while (await this.userVerificationRepository.existsBy({ token }));

    await this.userVerificationRepository.insert({
      userEmail,
      token,
      expirationDate: new Date(new Date().getTime() + 30 * 60000),
    });

    return token;
  }

  async sendUserVerificationEmail(userEmail: string) {
    const token = await this.createUserVerificationEmail(userEmail);

    const verificationLink = `${this.configService.get<string>('BACKEND_URL')}/email-sending/verify-email/${token}`;

    const emailHtml = `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            color: #fff;
            background-color: #007BFF;
            text-decoration: none;
            border-radius: 5px;
          }
          .button:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Verify Your Account</h2>
          <p>Thank you for signing up! To complete your registration, please verify your email by clicking the button below:</p>
          <a href="${verificationLink}" class="button">Verify Email</a>
          <p>Thank you,<br/>Property Vista</p>
        </div>
      </body>
      </html>
    `;

    this.mailerService.sendMail({
      to: userEmail,
      subject: 'Verify your account',
      html: emailHtml,
    });
  }

  async validateUserVerificationToken(token: string) {
    const verificationEmail = await this.userVerificationRepository.findOne({
      where: { token },
    });

    if (
      !verificationEmail ||
      verificationEmail.expirationDate.getTime() <= Date.now()
    ) {
      throw new UnauthorizedException('Token not valid');
    }

    await this.userVerificationRepository.remove(verificationEmail);

    const { userEmail } = verificationEmail;

    return this.userService.findByEmail(userEmail);
  }

  async createPasswordResetEmail(userEmail: string): Promise<string> {
    let token: string;
    do {
      token = await this.generateRandomToken();
    } while (await this.passwordResetRepository.existsBy({ token }));

    await this.passwordResetRepository.insert({
      userEmail,
      token,
      expirationDate: new Date(new Date().getTime() + 60 * 60000),
    });

    return token;
  }

  async sendPasswordResetEmail(userEmail: string): Promise<void> {
    if (!(await this.userService.existsByEmail(userEmail))) {
      return;
    }
    if (!(await this.userService.hasPassword(userEmail))) {
      return;
    }
    const token = await this.createPasswordResetEmail(userEmail);

    const resetPasswordLink = `${this.configService.get<string>('FRONTEND_URL')}/login/reset-password?token=${token}`;

    const emailHtml = `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            color: #fff;
            background-color: #007BFF;
            text-decoration: none;
            border-radius: 5px;
          }
          .button:hover {
            background-color: #c33229;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Reset Your Password</h2>
          <p>We received a request to reset your password. Click the button below to proceed:</p>
          <a href="${resetPasswordLink}" class="button">Reset Password</a>
          <p>If you did not request a password reset, you can ignore this email.</p>
          <p>Thank you,<br/>Property Vista</p>
        </div>
      </body>
      </html>
    `;

    this.mailerService.sendMail({
      to: userEmail,
      subject: 'Reset your password',
      html: emailHtml,
    });
  }

  async validatePasswordReset(token: string, newPassword: string) {
    const passwordReset = await this.passwordResetRepository.findOne({
      where: { token },
    });

    if (
      !passwordReset ||
      passwordReset.expirationDate.getTime() <= Date.now()
    ) {
      throw new UnauthorizedException('Token not valid');
    }

    await this.passwordResetRepository.remove(passwordReset);
    await this.userService.upadatePassword(
      passwordReset.userEmail,
      newPassword,
    );
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async deleteExpiredValidations() {
    await this.userVerificationRepository.delete({
      expirationDate: LessThanOrEqual(new Date()),
    });
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async deleteExpiredResetPasswords() {
    await this.passwordResetRepository.delete({
      expirationDate: LessThan(new Date()),
    });
  }
}
