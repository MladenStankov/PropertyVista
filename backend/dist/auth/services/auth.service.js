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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../users/users.service");
const bcrypt_1 = require("bcrypt");
const auth_refresh_token_service_1 = require("./auth-refresh-token.service");
const cookieOptions = {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: 'none',
    secure: true,
    path: '/',
};
let AuthService = class AuthService {
    constructor(userService, authRefreshTokenService) {
        this.userService = userService;
        this.authRefreshTokenService = authRefreshTokenService;
    }
    async register(registerPayload) {
        const { email } = registerPayload;
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            throw new common_1.ConflictException('User already exists');
        }
        return await this.userService.create(registerPayload);
    }
    async login(res, req, user) {
        const { access_token, refresh_token } = await this.authRefreshTokenService.generateTokenPair(req ? req.user : user);
        res.cookie('access_token', access_token, cookieOptions);
        res.cookie('refresh_token', refresh_token, cookieOptions);
    }
    async validateUser(loginPayload) {
        const { email, password } = loginPayload;
        const existingUser = await this.userService.findByEmail(email);
        if (!existingUser) {
            throw new common_1.UnauthorizedException('Invalid email or password!');
        }
        if (!existingUser.password ||
            !(await (0, bcrypt_1.compare)(password, existingUser.password))) {
            throw new common_1.UnauthorizedException('Invalid email or password!');
        }
        if (!existingUser.isVerified) {
            throw new common_1.UnauthorizedException('User is not verified!');
        }
        return existingUser;
    }
    async refreshTokens(req, res) {
        const { access_token, refresh_token } = await this.authRefreshTokenService.generateTokenPair(req.user.attributes, req.cookies.refresh_token, req.user.refreshTokenExpiresAt);
        res.cookie('access_token', access_token, cookieOptions);
        res.cookie('refresh_token', refresh_token, cookieOptions);
        return { access_token: access_token, refresh_token: refresh_token };
    }
    async logout(req, res) {
        await this.authRefreshTokenService.blacklistRefreshToken(req.cookies.refresh_token, req.user.refreshTokenExpiresAt, req.user.attributes.id);
        res.clearCookie('access_token', cookieOptions);
        res.clearCookie('refresh_token', cookieOptions);
    }
    async googleLogin(req, res) {
        const { fullName, email, imageUrl } = req.user;
        let existingUser = await this.userService.findByEmail(email);
        if (!existingUser) {
            const createUserDto = {
                fullName,
                email,
                imageUrl,
            };
            existingUser = await this.userService.create(createUserDto);
        }
        return this.login(res, null, existingUser);
    }
    async profileInfo(req) {
        const { id } = req.user;
        return await this.userService.profileInfo(id);
    }
    async profileListings(req) {
        const { id } = req.user;
        return await this.userService.profileListings(id);
    }
    async profileFavouriteListings(req) {
        const { id } = req.user;
        return await this.userService.profileFavouriteListings(id);
    }
    async changeName(name, user) {
        return await this.userService.changeName(name, user);
    }
    async changeImage(file, user) {
        return await this.userService.changeImage(file, user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_refresh_token_service_1.AuthRefreshTokenService])
], AuthService);
//# sourceMappingURL=auth.service.js.map