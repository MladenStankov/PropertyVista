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
var JwtStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const users_service_1 = require("../../users/users.service");
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(userService) {
        super({
            secretOrKey: `${process.env.JWT_SECRET}`,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([JwtStrategy_1.extractJwt]),
            ignoreExpiration: false,
        });
        this.userService = userService;
    }
    static extractJwt(req) {
        if (req.cookies && 'access_token' in req.cookies) {
            return req.cookies.access_token;
        }
        return null;
    }
    async validate(payload) {
        const user = await this.userService.findById(payload.userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (user.password && user.password !== payload.password) {
            throw new common_1.UnauthorizedException('Session expired');
        }
        return user;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = JwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map