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
exports.Chat = void 0;
const openapi = require("@nestjs/swagger");
const listing_entity_1 = require("../../listings/entity/listing.entity");
const user_entity_1 = require("../../users/entity/user.entity");
const typeorm_1 = require("typeorm");
const message_entity_1 = require("./message.entity");
let Chat = class Chat extends typeorm_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { uuid: { required: true, type: () => String }, listing: { required: true, type: () => require("../../listings/entity/listing.entity").Listing }, broker: { required: true, type: () => require("../../users/entity/user.entity").User }, homeSeeker: { required: true, type: () => require("../../users/entity/user.entity").User }, messages: { required: true, type: () => [require("./message.entity").Message] }, createdAt: { required: true, type: () => Date } };
    }
};
exports.Chat = Chat;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Chat.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => listing_entity_1.Listing, (Listing) => Listing.chats, { onDelete: 'CASCADE' }),
    __metadata("design:type", listing_entity_1.Listing)
], Chat.prototype, "listing", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.brokerChats, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Chat.prototype, "broker", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.homeSeekerChats, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], Chat.prototype, "homeSeeker", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (message) => message.chat, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Chat.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Chat.prototype, "createdAt", void 0);
exports.Chat = Chat = __decorate([
    (0, typeorm_1.Entity)('Chat')
], Chat);
//# sourceMappingURL=chat.entity.js.map