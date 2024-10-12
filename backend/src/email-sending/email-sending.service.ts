import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { UserVerificationEmail } from './entity/user-verification-email.entity';
import * as crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/users/users.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EmailSendingService {
  constructor(
    @InjectRepository(UserVerificationEmail)
    private readonly userEmailVerificationEmailRepository: Repository<UserVerificationEmail>,
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

    const userId = await this.userService.getIdByEmail(userEmail);

    if (!userId) {
      throw new UnauthorizedException('No User');
    }

    const user = await this.userService.findById(userId);

    if (user && user.isVerified) {
      throw new UnauthorizedException('User already verified');
    }

    do {
      token = await this.generateRandomToken();
    } while (
      await this.userEmailVerificationEmailRepository.existsBy({ token })
    );

    await this.userEmailVerificationEmailRepository.insert({
      userEmail,
      token,
      userId,
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
    const verificationEmail =
      await this.userEmailVerificationEmailRepository.findOne({
        where: { token },
      });

    if (
      !verificationEmail ||
      verificationEmail.expirationDate.getTime() <= Date.now()
    ) {
      throw new UnauthorizedException('Token not valid');
    }

    await this.userEmailVerificationEmailRepository.remove(verificationEmail);

    const { userId } = verificationEmail;

    return this.userService.findById(userId);
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async deleteExpiredRefreshTokens() {
    await this.userEmailVerificationEmailRepository.delete({
      expirationDate: LessThanOrEqual(new Date()),
    });
  }
}
