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
exports.ListingRoomDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const listing_entity_1 = require("../entity/listing.entity");
const room_type_dto_1 = require("../types/room-type.dto");
const swagger_1 = require("@nestjs/swagger");
class ListingRoomDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { type: { required: true, enum: require("../types/room-type.dto").RoomType }, amount: { required: true, type: () => Number } };
    }
}
exports.ListingRoomDto = ListingRoomDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ListingRoomDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ListingRoomDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", listing_entity_1.Listing)
], ListingRoomDto.prototype, "listing", void 0);
//# sourceMappingURL=listing-room.dto.js.map