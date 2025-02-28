import { Repository } from 'typeorm';
import { UserVerification } from './entity/user-verification-email.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/users/users.service';
import { PasswordReset } from './entity/password-reset-email.entity';
import { ConfigService } from '@nestjs/config';
export declare class EmailSendingService {
    private readonly userVerificationRepository;
    private readonly passwordResetRepository;
    private mailerService;
    private userService;
    private configService;
    constructor(userVerificationRepository: Repository<UserVerification>, passwordResetRepository: Repository<PasswordReset>, mailerService: MailerService, userService: UsersService, configService: ConfigService);
    private generateRandomToken;
    private createUserVerificationEmail;
    sendUserVerificationEmail(userEmail: string): Promise<void>;
    validateUserVerificationToken(token: string): Promise<void | import("../users/entity/user.entity").User>;
    createPasswordResetEmail(userEmail: string): Promise<string>;
    sendPasswordResetEmail(userEmail: string): Promise<void>;
    validatePasswordReset(token: string, newPassword: string): Promise<void>;
    deleteExpiredValidations(): Promise<void>;
    deleteExpiredResetPasswords(): Promise<void>;
}
