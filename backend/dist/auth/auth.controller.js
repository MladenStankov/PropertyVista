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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./services/auth.service");
const login_dto_1 = require("./dto/login.dto");
const local_guard_1 = require("./guards/local.guard");
const jwt_guard_1 = require("./guards/jwt.guard");
const jwt_refresh_guard_1 = require("./guards/jwt-refresh.guard");
const throttler_1 = require("@nestjs/throttler");
const google_oauth_guard_1 = require("./guards/google-oauth.guard");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const email_sending_service_1 = require("../email-sending/email-sending.service");
const config_1 = require("@nestjs/config");
const change_name_dto_1 = require("./dto/change-name.dto");
const change_image_dto_1 = require("./dto/change-image.dto");
const platform_express_1 = require("@nestjs/platform-express");
let AuthController = class AuthController {
    constructor(authService, emailSendingService, configService) {
        this.authService = authService;
        this.emailSendingService = emailSendingService;
        this.configService = configService;
    }
    async register(registerPayload) {
        const { email } = await this.authService.register(registerPayload);
        return this.emailSendingService.sendUserVerificationEmail(email);
    }
    async login(req, res) {
        return this.authService.login(res, req);
    }
    async profile(req) {
        const { id, fullName, email, imageUrl } = req.user;
        return { id, fullName, email, imageUrl };
    }
    async refreshTokens(req, res) {
        return this.authService.refreshTokens(req, res);
    }
    async logout(req, res) {
        return this.authService.logout(req, res);
    }
    async googleAuth() { }
    async googleAuthCallBack(req, res) {
        await this.authService.googleLogin(req, res);
        res.redirect(`${this.configService.get('FRONTEND_URL')}`);
    }
    async profileInfo(req) {
        return this.authService.profileInfo(req);
    }
    async profileListings(req) {
        return this.authService.profileListings(req);
    }
    async profileFavouriteListings(req) {
        return this.authService.profileFavouriteListings(req);
    }
    async changeName(changeNameDto, req) {
        return this.authService.changeName(changeNameDto.fullName, req.user);
    }
    async changeImage(file, req) {
        return this.authService.changeImage(file, req.user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/register'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    (0, common_1.UseGuards)(local_guard_1.LocalGuard),
    (0, common_1.Post)('/login'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('/profile'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "profile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard),
    (0, common_1.Post)('/refresh-tokens'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokens", null);
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard),
    (0, common_1.Post)('/logout'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('/google'),
    (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOAuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('/google/callback'),
    (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOAuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthCallBack", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 100, ttl: 1000 } }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('/profile-info'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "profileInfo", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 100, ttl: 1000 } }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('/profile-listings'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "profileListings", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 100, ttl: 1000 } }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('/profile-favourite-listings'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "profileFavouriteListings", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 100, ttl: 1000 } }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Put)('/change-name'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_name_dto_1.ChangeNameDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changeName", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 100, ttl: 1000 } }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Update the image',
        type: change_image_dto_1.ChangeImageDto,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.Put)('/change-image'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changeImage", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        email_sending_service_1.EmailSendingService,
        config_1.ConfigService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map