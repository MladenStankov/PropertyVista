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
exports.UpdateListingDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const listing_dto_1 = require("./listing.dto");
const listing_location_dto_1 = require("./listing-location.dto");
const listing_image_dto_1 = require("./listing-image.dto");
const listing_amenity_dto_1 = require("./listing-amenity.dto");
const listing_room_dto_1 = require("./listing-room.dto");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const deleted_image_dto_1 = require("./deleted-image.dto");
class UpdateListingDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { listing: { required: true, type: () => Object }, location: { required: true, type: () => Object }, images: { required: true, type: () => [require("./listing-image.dto").ListingImageDto] }, deletedImages: { required: false, type: () => [require("./deleted-image.dto").DeletedImagesDto] }, amenities: { required: false, type: () => [require("./listing-amenity.dto").ListingAmenityDto] }, deletedAmenities: { required: false, type: () => [require("./listing-amenity.dto").ListingAmenityDto] }, rooms: { required: false, type: () => [require("./listing-room.dto").ListingRoomDto] } };
    }
}
exports.UpdateListingDto = UpdateListingDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => listing_dto_1.ListingDto),
    (0, swagger_1.ApiProperty)({ type: listing_dto_1.ListingDto, required: false }),
    __metadata("design:type", Object)
], UpdateListingDto.prototype, "listing", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => listing_location_dto_1.ListingLocationDto),
    (0, swagger_1.ApiProperty)({ type: listing_location_dto_1.ListingLocationDto, required: false }),
    __metadata("design:type", Object)
], UpdateListingDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => listing_image_dto_1.ListingImageDto),
    (0, swagger_1.ApiProperty)({
        type: 'array',
        items: { type: 'string', format: 'binary' },
        required: false,
    }),
    __metadata("design:type", Array)
], UpdateListingDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [deleted_image_dto_1.DeletedImagesDto], required: false }),
    __metadata("design:type", Array)
], UpdateListingDto.prototype, "deletedImages", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => listing_amenity_dto_1.ListingAmenityDto),
    (0, swagger_1.ApiProperty)({ type: [listing_amenity_dto_1.ListingAmenityDto], required: false }),
    __metadata("design:type", Array)
], UpdateListingDto.prototype, "amenities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [listing_amenity_dto_1.ListingAmenityDto], required: false }),
    __metadata("design:type", Array)
], UpdateListingDto.prototype, "deletedAmenities", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => listing_room_dto_1.ListingRoomDto),
    (0, swagger_1.ApiProperty)({ type: [listing_room_dto_1.ListingRoomDto], required: false }),
    __metadata("design:type", Array)
], UpdateListingDto.prototype, "rooms", void 0);
//# sourceMappingURL=update-listing.dto.js.map