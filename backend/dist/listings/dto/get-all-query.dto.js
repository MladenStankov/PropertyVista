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
exports.GetAllQueryDto = void 0;
const openapi = require("@nestjs/swagger");
const sort_type_type_1 = require("../types/sort-type.type");
const class_validator_1 = require("class-validator");
const construction_type_dto_1 = require("../types/construction-type.dto");
const listing_type_dto_1 = require("../types/listing-type.dto");
class GetAllQueryDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { search: { required: false, type: () => String }, type: { required: false, enum: require("../types/listing-type.dto").ListingType }, minPrice: { required: false, type: () => Number }, maxPrice: { required: false, type: () => Number }, constructionType: { required: false, enum: require("../types/construction-type.dto").ConstructionType }, minSurfaceArea: { required: false, type: () => Number }, maxSurfaceArea: { required: false, type: () => Number }, minYear: { required: false, type: () => Number }, maxYear: { required: false, type: () => Number }, minBedrooms: { required: false, type: () => Number }, maxBedrooms: { required: false, type: () => Number }, minBathrooms: { required: false, type: () => Number }, maxBathrooms: { required: false, type: () => Number }, minOtherRooms: { required: false, type: () => Number }, maxOtherRooms: { required: false, type: () => Number }, minFloors: { required: false, type: () => Number }, maxFloors: { required: false, type: () => Number }, amenities: { required: false, enum: require("../types/amenity-type.dto").AmenityType, isArray: true }, sort: { required: false, enum: require("../types/sort-type.type").SortType } };
    }
}
exports.GetAllQueryDto = GetAllQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetAllQueryDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(listing_type_dto_1.ListingType),
    __metadata("design:type", String)
], GetAllQueryDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetAllQueryDto.prototype, "minPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetAllQueryDto.prototype, "maxPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(construction_type_dto_1.ConstructionType),
    __metadata("design:type", String)
], GetAllQueryDto.prototype, "constructionType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetAllQueryDto.prototype, "minSurfaceArea", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetAllQueryDto.prototype, "maxSurfaceArea", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetAllQueryDto.prototype, "minYear", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetAllQueryDto.prototype, "maxYear", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetAllQueryDto.prototype, "minBedrooms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetAllQueryDto.prototype, "maxBedrooms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetAllQueryDto.prototype, "minBathrooms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetAllQueryDto.prototype, "maxBathrooms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetAllQueryDto.prototype, "minOtherRooms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetAllQueryDto.prototype, "maxOtherRooms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetAllQueryDto.prototype, "minFloors", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetAllQueryDto.prototype, "maxFloors", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], GetAllQueryDto.prototype, "amenities", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(sort_type_type_1.SortType),
    __metadata("design:type", String)
], GetAllQueryDto.prototype, "sort", void 0);
//# sourceMappingURL=get-all-query.dto.js.map