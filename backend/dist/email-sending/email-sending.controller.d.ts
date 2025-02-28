import { EmailSendingService } from './email-sending.service';
import { Response } from 'express';
import { AuthService } from 'src/auth/services/auth.service';
import { ValidatePasswordReset } from './dto/validate-password-reset.dto';
import { SendPasswordResetDto } from './dto/send-password-reset.dto';
import { ConfigService } from '@nestjs/config';
export declare class EmailSendingController {
    private emailSendingService;
    private authService;
    private configService;
    constructor(emailSendingService: EmailSendingService, authService: AuthService, configService: ConfigService);
    verifyEmail(token: string, res: Response): Promise<void>;
    sendPasswordReset(sendPasswordResetDto: SendPasswordResetDto): Promise<void>;
    validatePasswordReset(validatePasswordResetDto: ValidatePasswordReset): Promise<void>;
}
