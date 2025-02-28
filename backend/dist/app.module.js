"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const email_sending_module_1 = require("./email-sending/email-sending.module");
const aws_module_1 = require("./aws/aws.module");
const listings_module_1 = require("./listings/listings.module");
const schedule_1 = require("@nestjs/schedule");
const aws_cleanup_module_1 = require("./aws-cleanup/aws-cleanup.module");
const calculator_module_1 = require("./calculator/calculator.module");
const chats_module_1 = require("./chats/chats.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: Number(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE,
                autoLoadEntities: true,
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            throttler_1.ThrottlerModule.forRoot(),
            email_sending_module_1.EmailSendingModule,
            aws_module_1.AwsModule,
            listings_module_1.ListingsModule,
            aws_cleanup_module_1.AwsCleanupModule,
            calculator_module_1.CalculatorModule,
            chats_module_1.ChatsModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map