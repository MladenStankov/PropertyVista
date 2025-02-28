"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSendingModule = void 0;
const common_1 = require("@nestjs/common");
const email_sending_service_1 = require("./email-sending.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_verification_email_entity_1 = require("./entity/user-verification-email.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const users_module_1 = require("../users/users.module");
const config_1 = require("@nestjs/config");
const email_sending_controller_1 = require("./email-sending.controller");
const auth_module_1 = require("../auth/auth.module");
const password_reset_email_entity_1 = require("./entity/password-reset-email.entity");
let EmailSendingModule = class EmailSendingModule {
};
exports.EmailSendingModule = EmailSendingModule;
exports.EmailSendingModule = EmailSendingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            typeorm_1.TypeOrmModule.forFeature([user_verification_email_entity_1.UserVerification, password_reset_email_entity_1.PasswordReset]),
            users_module_1.UsersModule,
            mailer_1.MailerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    transport: {
                        host: 'smtp.gmail.com',
                        auth: {
                            user: configService.get('EMAIL_USERNAME'),
                            pass: configService.get('EMAIL_PASSWORD'),
                        },
                    },
                }),
            }),
        ],
        providers: [email_sending_service_1.EmailSendingService],
        exports: [email_sending_service_1.EmailSendingService],
        controllers: [email_sending_controller_1.EmailSendingController],
    })
], EmailSendingModule);
//# sourceMappingURL=email-sending.module.js.map