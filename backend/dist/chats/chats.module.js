"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chat_entity_1 = require("./entity/chat.entity");
const users_module_1 = require("../users/users.module");
const auth_module_1 = require("../auth/auth.module");
const message_entity_1 = require("./entity/message.entity");
const chats_controller_1 = require("./chats.controller");
const chat_service_1 = require("./services/chat.service");
const message_service_1 = require("./services/message.service");
const listings_module_1 = require("../listings/listings.module");
const user_entity_1 = require("../users/entity/user.entity");
const chats_gateway_1 = require("./chats.gateway");
const jwt_1 = require("@nestjs/jwt");
let ChatsModule = class ChatsModule {
};
exports.ChatsModule = ChatsModule;
exports.ChatsModule = ChatsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([chat_entity_1.Chat, message_entity_1.Message, user_entity_1.User]),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            listings_module_1.ListingsModule,
            jwt_1.JwtModule,
        ],
        providers: [chat_service_1.ChatService, message_service_1.MessageService, chats_gateway_1.ChatsGateway],
        controllers: [chats_controller_1.ChatsController],
    })
], ChatsModule);
//# sourceMappingURL=chats.module.js.map