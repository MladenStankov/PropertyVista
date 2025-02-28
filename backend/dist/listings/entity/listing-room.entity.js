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
exports.ListingRoom = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const room_type_dto_1 = require("../types/room-type.dto");
const listing_entity_1 = require("./listing.entity");
let ListingRoom = class ListingRoom extends typeorm_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, type: { required: true, enum: require("../types/room-type.dto").RoomType }, amount: { required: true, type: () => Number }, listing: { required: true, type: () => require("./listing.entity").Listing } };
    }
};
exports.ListingRoom = ListingRoom;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ListingRoom.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: room_type_dto_1.RoomType }),
    __metadata("design:type", String)
], ListingRoom.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ListingRoom.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => listing_entity_1.Listing, (listing) => listing.rooms, { onDelete: 'CASCADE' }),
    __metadata("design:type", listing_entity_1.Listing)
], ListingRoom.prototype, "listing", void 0);
exports.ListingRoom = ListingRoom = __decorate([
    (0, typeorm_1.Entity)('ListingRoom')
], ListingRoom);
//# sourceMappingURL=listing-room.entity.js.map