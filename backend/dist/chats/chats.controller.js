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
exports.ChatsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const chat_service_1 = require("./services/chat.service");
const message_service_1 = require("./services/message.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const throttler_1 = require("@nestjs/throttler");
let ChatsController = class ChatsController {
    constructor(chatService, messageService) {
        this.chatService = chatService;
        this.messageService = messageService;
    }
    async createChat(req, listingUuid) {
        return this.chatService.createChat(req.user.id, listingUuid);
    }
    async getChats(req) {
        return this.chatService.getChats(req.user.id);
    }
    async getChatMessages(uuid, req) {
        return this.chatService.getChatMessages(uuid, req.user.id);
    }
};
exports.ChatsController = ChatsController;
__decorate([
    (0, common_1.Post)(':listingUuid'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('listingUuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "createChat", null);
__decorate([
    (0, common_1.Get)(),
    (0, throttler_1.Throttle)({ default: { limit: 100, ttl: 1000 } }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    openapi.ApiResponse({ status: 200, type: require("./dto/chat.dto").ChatDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getChats", null);
__decorate([
    (0, common_1.Get)(':uuid'),
    (0, throttler_1.Throttle)({ default: { limit: 100, ttl: 1000 } }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getChatMessages", null);
exports.ChatsController = ChatsController = __decorate([
    (0, common_1.Controller)('chats'),
    (0, swagger_1.ApiTags)('Chats'),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        message_service_1.MessageService])
], ChatsController);
//# sourceMappingURL=chats.controller.js.map