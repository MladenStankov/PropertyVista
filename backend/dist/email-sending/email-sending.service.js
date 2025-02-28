"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSendingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_verification_email_entity_1 = require("./entity/user-verification-email.entity");
const crypto = require("crypto");
const mailer_1 = require("@nestjs-modules/mailer");
const users_service_1 = require("../users/users.service");
const schedule_1 = require("@nestjs/schedule");
const password_reset_email_entity_1 = require("./entity/password-reset-email.entity");
const config_1 = require("@nestjs/config");
let EmailSendingService = class EmailSendingService {
    constructor(userVerificationRepository, passwordResetRepository, mailerService, userService, configService) {
        this.userVerificationRepository = userVerificationRepository;
        this.passwordResetRepository = passwordResetRepository;
        this.mailerService = mailerService;
        this.userService = userService;
        this.configService = configService;
    }
    async generateRandomToken() {
        return crypto.randomBytes(20).toString('hex');
    }
    async createUserVerificationEmail(userEmail) {
        let token;
        if (!this.userService.existsByEmail(userEmail)) {
            throw new common_1.NotFoundException('User does not exist.');
        }
        const user = await this.userService.findByEmail(userEmail);
        if (user && user.isVerified) {
            throw new common_1.UnauthorizedException('User already verified');
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
    async sendUserVerificationEmail(userEmail) {
        const token = await this.createUserVerificationEmail(userEmail);
        const verificationLink = `${this.configService.get('BACKEND_URL')}/email-sending/verify-email/${token}`;
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
    async validateUserVerificationToken(token) {
        const verificationEmail = await this.userVerificationRepository.findOne({
            where: { token },
        });
        if (!verificationEmail ||
            verificationEmail.expirationDate.getTime() <= Date.now()) {
            throw new common_1.UnauthorizedException('Token not valid');
        }
        await this.userVerificationRepository.remove(verificationEmail);
        const { userEmail } = verificationEmail;
        return this.userService.findByEmail(userEmail);
    }
    async createPasswordResetEmail(userEmail) {
        let token;
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
    async sendPasswordResetEmail(userEmail) {
        if (!(await this.userService.existsByEmail(userEmail))) {
            return;
        }
        if (!(await this.userService.hasPassword(userEmail))) {
            return;
        }
        const token = await this.createPasswordResetEmail(userEmail);
        const resetPasswordLink = `${this.configService.get('FRONTEND_URL')}/login/reset-password?token=${token}`;
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
    async validatePasswordReset(token, newPassword) {
        const passwordReset = await this.passwordResetRepository.findOne({
            where: { token },
        });
        if (!passwordReset ||
            passwordReset.expirationDate.getTime() <= Date.now()) {
            throw new common_1.UnauthorizedException('Token not valid');
        }
        await this.passwordResetRepository.remove(passwordReset);
        await this.userService.upadatePassword(passwordReset.userEmail, newPassword);
    }
    async deleteExpiredValidations() {
        await this.userVerificationRepository.delete({
            expirationDate: (0, typeorm_2.LessThanOrEqual)(new Date()),
        });
    }
    async deleteExpiredResetPasswords() {
        await this.passwordResetRepository.delete({
            expirationDate: (0, typeorm_2.LessThan)(new Date()),
        });
    }
};
exports.EmailSendingService = EmailSendingService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmailSendingService.prototype, "deleteExpiredValidations", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmailSendingService.prototype, "deleteExpiredResetPasswords", null);
exports.EmailSendingService = EmailSendingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_verification_email_entity_1.UserVerification)),
    __param(1, (0, typeorm_1.InjectRepository)(password_reset_email_entity_1.PasswordReset)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        mailer_1.MailerService,
        users_service_1.UsersService,
        config_1.ConfigService])
], EmailSendingService);
//# sourceMappingURL=email-sending.service.js.map