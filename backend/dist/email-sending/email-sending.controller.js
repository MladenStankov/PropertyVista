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
exports.EmailSendingController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const email_sending_service_1 = require("./email-sending.service");
const auth_service_1 = require("../auth/services/auth.service");
const swagger_1 = require("@nestjs/swagger");
const validate_password_reset_dto_1 = require("./dto/validate-password-reset.dto");
const send_password_reset_dto_1 = require("./dto/send-password-reset.dto");
const config_1 = require("@nestjs/config");
let EmailSendingController = class EmailSendingController {
    constructor(emailSendingService, authService, configService) {
        this.emailSendingService = emailSendingService;
        this.authService = authService;
        this.configService = configService;
    }
    async verifyEmail(token, res) {
        const user = await this.emailSendingService.validateUserVerificationToken(token);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.isVerified = true;
        await user.save();
        await this.authService.login(res, null, user);
        res.redirect(`${this.configService.get('FRONTEND_URL')}`);
    }
    async sendPasswordReset(sendPasswordResetDto) {
        return await this.emailSendingService.sendPasswordResetEmail(sendPasswordResetDto.email);
    }
    async validatePasswordReset(validatePasswordResetDto) {
        return await this.emailSendingService.validatePasswordReset(validatePasswordResetDto.token, validatePasswordResetDto.password);
    }
};
exports.EmailSendingController = EmailSendingController;
__decorate([
    (0, common_1.Get)('/verify-email/:token'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmailSendingController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('/password-forgot'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_password_reset_dto_1.SendPasswordResetDto]),
    __metadata("design:returntype", Promise)
], EmailSendingController.prototype, "sendPasswordReset", null);
__decorate([
    (0, common_1.Post)('/password-reset'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validate_password_reset_dto_1.ValidatePasswordReset]),
    __metadata("design:returntype", Promise)
], EmailSendingController.prototype, "validatePasswordReset", null);
exports.EmailSendingController = EmailSendingController = __decorate([
    (0, common_1.Controller)('email-sending'),
    (0, swagger_1.ApiTags)('Email Sending'),
    __metadata("design:paramtypes", [email_sending_service_1.EmailSendingService,
        auth_service_1.AuthService,
        config_1.ConfigService])
], EmailSendingController);
//# sourceMappingURL=email-sending.controller.js.map