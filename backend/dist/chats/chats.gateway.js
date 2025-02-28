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
exports.ChatsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("./services/chat.service");
const message_service_1 = require("./services/message.service");
const jwt_websocket_middleware_1 = require("../auth/jwt-websocket.middleware");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../users/users.service");
let ChatsGateway = class ChatsGateway {
    constructor(jwtService, configService, userService, chatService, messageService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.userService = userService;
        this.chatService = chatService;
        this.messageService = messageService;
    }
    async sendMessage(client, data) {
        if (!client.rooms.has(data.chatUuid)) {
            return client.emit('error');
        }
        try {
            const message = await this.messageService.createMessage(data.chatUuid, client.data.user.id, data.message);
            const responseData = {
                message: message.message,
                createdAt: message.createdAt,
                senderId: client.data.user.id,
                userFullName: client.data.user.fullName,
                userImage: client.data.user.imageUrl,
                chatUuid: message.chat.uuid,
            };
            this.server.to(data.chatUuid).emit('receiveMessage', { ...responseData });
            console.log('bravo');
        }
        catch (error) {
            client.emit('error', error.message);
        }
    }
    async afterInit() {
        this.server.use((socket, next) => {
            const middleware = new jwt_websocket_middleware_1.JwtWebsocketMiddleware(this.jwtService, this.configService, this.userService);
            middleware.use(socket, next);
        });
    }
    async handleConnection(client) {
        console.log('Client connected:', client.id);
        const userChats = await this.chatService.getChats(client.data.user.id);
        userChats.brokerChats.forEach((chat) => {
            client.join(chat.uuid);
        });
        userChats.homeSeekingChats.forEach((chat) => {
            client.join(chat.uuid);
        });
    }
    handleDisconnect(client) {
        console.log('Client disconnected:', client.id);
    }
};
exports.ChatsGateway = ChatsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatsGateway.prototype, "sendMessage", null);
exports.ChatsGateway = ChatsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: true,
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        users_service_1.UsersService,
        chat_service_1.ChatService,
        message_service_1.MessageService])
], ChatsGateway);
//# sourceMappingURL=chats.gateway.js.map