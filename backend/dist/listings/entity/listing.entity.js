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
exports.Listing = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entity/user.entity");
const listing_image_entity_1 = require("./listing-image.entity");
const listing_type_dto_1 = require("../types/listing-type.dto");
const listing_location_entity_1 = require("./listing-location.entity");
const listing_room_entity_1 = require("./listing-room.entity");
const listing_amenity_entity_1 = require("./listing-amenity.entity");
const listing_price_history_entity_1 = require("./listing-price-history.entity");
const construction_type_dto_1 = require("../types/construction-type.dto");
const listing_view_entity_1 = require("./listing-view.entity");
const listing_favourite_entity_1 = require("./listing-favourite.entity");
const chat_entity_1 = require("../../chats/entity/chat.entity");
let Listing = class Listing extends typeorm_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, uuid: { required: true, type: () => String }, description: { required: true, type: () => String }, constructionType: { required: true, enum: require("../types/construction-type.dto").ConstructionType }, constructionYear: { required: true, type: () => Number }, price: { required: true, type: () => Number }, livingSurface: { required: true, type: () => Number }, type: { required: true, enum: require("../types/listing-type.dto").ListingType }, user: { required: true, type: () => require("../../users/entity/user.entity").User }, images: { required: true, type: () => [require("./listing-image.entity").ListingImage] }, location: { required: true, type: () => require("./listing-location.entity").ListingLocation }, rooms: { required: true, type: () => [require("./listing-room.entity").ListingRoom] }, amenities: { required: true, type: () => [require("./listing-amenity.entity").ListingAmenity] }, views: { required: true, type: () => [require("./listing-view.entity").ListingView] }, favourites: { required: true, type: () => [require("./listing-favourite.entity").ListingFavourite] }, priceHistory: { required: true, type: () => [require("./listing-price-history.entity").ListingPriceHistory] }, chats: { required: true, type: () => [require("../../chats/entity/chat.entity").Chat] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.Listing = Listing;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Listing.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Listing.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Listing.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'enum', enum: construction_type_dto_1.ConstructionType }),
    __metadata("design:type", String)
], Listing.prototype, "constructionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Listing.prototype, "constructionYear", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Listing.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Listing.prototype, "livingSurface", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: listing_type_dto_1.ListingType }),
    __metadata("design:type", String)
], Listing.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.listings, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Listing.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => listing_image_entity_1.ListingImage, (image) => image.listing, { cascade: true }),
    __metadata("design:type", Array)
], Listing.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => listing_location_entity_1.ListingLocation, (location) => location.listing, {
        cascade: true,
    }),
    __metadata("design:type", listing_location_entity_1.ListingLocation)
], Listing.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => listing_room_entity_1.ListingRoom, (room) => room.listing, { cascade: true }),
    __metadata("design:type", Array)
], Listing.prototype, "rooms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => listing_amenity_entity_1.ListingAmenity, (amenity) => amenity.listing, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Listing.prototype, "amenities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => listing_view_entity_1.ListingView, (view) => view.listing, { cascade: true }),
    __metadata("design:type", Array)
], Listing.prototype, "views", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => listing_favourite_entity_1.ListingFavourite, (favourite) => favourite.listing, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Listing.prototype, "favourites", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => listing_price_history_entity_1.ListingPriceHistory, (priceHistory) => priceHistory.listing, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Listing.prototype, "priceHistory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chat_entity_1.Chat, (chat) => chat.broker, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Listing.prototype, "chats", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Listing.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Listing.prototype, "updatedAt", void 0);
exports.Listing = Listing = __decorate([
    (0, typeorm_1.Entity)('Listing')
], Listing);
//# sourceMappingURL=listing.entity.js.map