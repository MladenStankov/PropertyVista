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
exports.AuthRefreshTokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const auth_refresh_token_entity_1 = require("../entity/auth-refresh-token.entity");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
let AuthRefreshTokenService = class AuthRefreshTokenService {
    constructor(jwtService, configService, authRefreshTokenRepository) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.authRefreshTokenRepository = authRefreshTokenRepository;
    }
    isRefreshTokenBlackListed(refreshToken, userId) {
        return this.authRefreshTokenRepository.existsBy({ refreshToken, userId });
    }
    async blacklistRefreshToken(refreshToken, expiresAt, userId) {
        await this.authRefreshTokenRepository.insert({
            refreshToken,
            expiresAt,
            userId,
        });
    }
    async generateRefreshToken(user, currentRefreshToken, currentRefreshTokenExpiresAt) {
        const payload = {
            userId: user.id,
            password: user.password,
            date: Date.now(),
        };
        const newRefreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: '30d',
        });
        if (currentRefreshToken && currentRefreshTokenExpiresAt) {
            if (await this.isRefreshTokenBlackListed(currentRefreshToken, user.id)) {
                throw new common_1.UnauthorizedException('Invalid refresh token.');
            }
            await this.blacklistRefreshToken(currentRefreshToken, currentRefreshTokenExpiresAt, user.id);
        }
        return newRefreshToken;
    }
    async generateTokenPair(user, currentRefreshToken, currentRefreshTokenExpiresAt) {
        const payload = {
            userId: user.id,
            password: user.password,
            date: Date.now(),
        };
        return {
            access_token: this.jwtService.sign(payload, {
                secret: this.configService.get('JWT_SECRET'),
            }),
            refresh_token: await this.generateRefreshToken(user, currentRefreshToken, currentRefreshTokenExpiresAt),
        };
    }
    async deleteExpiredRefreshTokens() {
        await this.authRefreshTokenRepository.delete({
            expiresAt: (0, typeorm_2.LessThanOrEqual)(new Date()),
        });
    }
};
exports.AuthRefreshTokenService = AuthRefreshTokenService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthRefreshTokenService.prototype, "deleteExpiredRefreshTokens", null);
exports.AuthRefreshTokenService = AuthRefreshTokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(auth_refresh_token_entity_1.AuthRefreshToken)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        typeorm_2.Repository])
], AuthRefreshTokenService);
//# sourceMappingURL=auth-refresh-token.service.js.map