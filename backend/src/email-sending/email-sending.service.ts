import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { UserVerification } from './entity/user-verification-email.entity';
import * as crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/users/users.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PasswordReset } from './entity/password-reset-email.entity';

@Injectable()
export class EmailSendingService {
  constructor(
    @InjectRepository(UserVerification)
    private readonly userVerificationRepository: Repository<UserVerification>,
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: Repository<PasswordReset>,
    private mailerService: MailerService,
    private userService: UsersService,
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

    this.mailerService.sendMail({
      to: userEmail,
      subject: 'Verify your account',
      html: `http://localhost:3000/email-sending/verify-email/${token}`,
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
    if (!this.userService.existsByEmail(userEmail)) {
      return;
    }

    const token = await this.createPasswordResetEmail(userEmail);

    this.mailerService.sendMail({
      to: userEmail,
      subject: 'Reset your password',
      html: `${token}`,
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
      expirationDate: LessThanOrEqual(new Date()),
    });
  }
}
