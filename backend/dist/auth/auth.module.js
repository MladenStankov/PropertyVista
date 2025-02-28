"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./services/auth.service");
const users_module_1 = require("../users/users.module");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const jwt_refresh_strategy_1 = require("./strategies/jwt-refresh.strategy");
const local_strategy_1 = require("./strategies/local-strategy");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const jwt_guard_1 = require("./guards/jwt.guard");
const google_strategy_1 = require("./strategies/google.strategy");
const google_oauth_guard_1 = require("./guards/google-oauth.guard");
const email_sending_module_1 = require("../email-sending/email-sending.module");
const typeorm_1 = require("@nestjs/typeorm");
const auth_refresh_token_entity_1 = require("./entity/auth-refresh-token.entity");
const auth_refresh_token_service_1 = require("./services/auth-refresh-token.service");
const jwt_optional_guard_1 = require("./guards/jwt-optional.guard");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([auth_refresh_token_entity_1.AuthRefreshToken]),
            users_module_1.UsersModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: `${process.env.JWT_SECRET}`,
                signOptions: { expiresIn: '30m' },
            }),
            (0, common_1.forwardRef)(() => email_sending_module_1.EmailSendingModule),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            jwt_refresh_strategy_1.JwtRefreshStrategy,
            local_strategy_1.LocalStrategy,
            jwt_guard_1.JwtGuard,
            jwt_optional_guard_1.JwtOptionalGuard,
            google_strategy_1.GoogleStrategy,
            google_oauth_guard_1.GoogleOAuthGuard,
            auth_refresh_token_service_1.AuthRefreshTokenService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
        exports: [jwt_guard_1.JwtGuard, auth_service_1.AuthService, jwt_optional_guard_1.JwtOptionalGuard],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map