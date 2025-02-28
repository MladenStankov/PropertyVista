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
exports.JwtWebsocketMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const cookie = require("cookie");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../users/users.service");
let JwtWebsocketMiddleware = class JwtWebsocketMiddleware {
    constructor(jwtService, configService, userService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.userService = userService;
    }
    async use(socket, next) {
        try {
            const cookieHeader = socket.handshake.headers.cookie;
            const cookies = cookie.parse(cookieHeader);
            const acceessToken = cookies['access_token'];
            if (!acceessToken) {
                throw new common_1.UnauthorizedException();
            }
            const payload = await this.jwtService.verifyAsync(acceessToken, {
                secret: this.configService.getOrThrow('JWT_SECRET'),
            });
            const user = await this.userService.findById(payload.userId);
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            socket.data.user = user;
            next();
        }
        catch (err) {
            console.log(err);
            next(new common_1.UnauthorizedException('Invalid or expired token'));
        }
    }
};
exports.JwtWebsocketMiddleware = JwtWebsocketMiddleware;
exports.JwtWebsocketMiddleware = JwtWebsocketMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        users_service_1.UsersService])
], JwtWebsocketMiddleware);
//# sourceMappingURL=jwt-websocket.middleware.js.map