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
exports.PublishListingDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const listing_dto_1 = require("./listing.dto");
const listing_location_dto_1 = require("./listing-location.dto");
const listing_image_dto_1 = require("./listing-image.dto");
const listing_amenity_dto_1 = require("./listing-amenity.dto");
const listing_room_dto_1 = require("./listing-room.dto");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class PublishListingDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { listing: { required: true, type: () => require("./listing.dto").ListingDto }, location: { required: true, type: () => require("./listing-location.dto").ListingLocationDto }, images: { required: true, type: () => [require("./listing-image.dto").ListingImageDto] }, amenities: { required: false, type: () => [require("./listing-amenity.dto").ListingAmenityDto] }, rooms: { required: false, type: () => [require("./listing-room.dto").ListingRoomDto] } };
    }
}
exports.PublishListingDto = PublishListingDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => listing_dto_1.ListingDto),
    (0, swagger_1.ApiProperty)({ type: listing_dto_1.ListingDto }),
    __metadata("design:type", listing_dto_1.ListingDto)
], PublishListingDto.prototype, "listing", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => listing_location_dto_1.ListingLocationDto),
    (0, swagger_1.ApiProperty)({ type: listing_location_dto_1.ListingLocationDto }),
    __metadata("design:type", listing_location_dto_1.ListingLocationDto)
], PublishListingDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => listing_image_dto_1.ListingImageDto),
    (0, swagger_1.ApiProperty)({ type: 'array', items: { type: 'string', format: 'binary' } }),
    __metadata("design:type", Array)
], PublishListingDto.prototype, "images", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => listing_amenity_dto_1.ListingAmenityDto),
    (0, swagger_1.ApiProperty)({ type: [listing_amenity_dto_1.ListingAmenityDto], required: false }),
    __metadata("design:type", Array)
], PublishListingDto.prototype, "amenities", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => listing_room_dto_1.ListingRoomDto),
    (0, swagger_1.ApiProperty)({ type: [listing_room_dto_1.ListingRoomDto], required: false }),
    __metadata("design:type", Array)
], PublishListingDto.prototype, "rooms", void 0);
//# sourceMappingURL=publish-listing.dto.js.map