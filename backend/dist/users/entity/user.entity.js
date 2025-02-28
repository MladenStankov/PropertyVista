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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const chat_entity_1 = require("../../chats/entity/chat.entity");
const message_entity_1 = require("../../chats/entity/message.entity");
const listing_favourite_entity_1 = require("../../listings/entity/listing-favourite.entity");
const listing_entity_1 = require("../../listings/entity/listing.entity");
const typeorm_1 = require("typeorm");
let User = class User extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.isVerified = false;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, fullName: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: false, type: () => String }, imageUrl: { required: false, type: () => String }, isVerified: { required: true, type: () => Boolean, default: false }, listings: { required: true, type: () => [require("../../listings/entity/listing.entity").Listing] }, favourites: { required: true, type: () => [require("../../listings/entity/listing-favourite.entity").ListingFavourite] }, brokerChats: { required: true, type: () => [require("../../chats/entity/chat.entity").Chat] }, homeSeekerChats: { required: true, type: () => [require("../../chats/entity/chat.entity").Chat] }, messages: { required: true, type: () => [require("../../chats/entity/message.entity").Message] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsStrongPassword)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({
        default: 'https://property-vista-images.s3.eu-north-1.amazonaws.com/default-profile-image.png',
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => listing_entity_1.Listing, (listing) => listing.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "listings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => listing_favourite_entity_1.ListingFavourite, (favourite) => favourite.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "favourites", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chat_entity_1.Chat, (chat) => chat.broker, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "brokerChats", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chat_entity_1.Chat, (chat) => chat.broker, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "homeSeekerChats", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (message) => message.sender, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('Users')
], User);
//# sourceMappingURL=user.entity.js.map