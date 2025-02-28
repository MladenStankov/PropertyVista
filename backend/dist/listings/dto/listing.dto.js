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
exports.ListingDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../../users/entity/user.entity");
const swagger_1 = require("@nestjs/swagger");
class ListingDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { description: { required: false, type: () => String }, constructionType: { required: false, enum: require("../types/construction-type.dto").ConstructionType }, constructionYear: { required: false, type: () => Number }, price: { required: true, type: () => Number }, livingSurface: { required: false, type: () => Number }, type: { required: true, enum: require("../types/listing-type.dto").ListingType } };
    }
}
exports.ListingDto = ListingDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListingDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ListingDto.prototype, "constructionYear", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ListingDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ListingDto.prototype, "livingSurface", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", user_entity_1.User)
], ListingDto.prototype, "user", void 0);
//# sourceMappingURL=listing.dto.js.map