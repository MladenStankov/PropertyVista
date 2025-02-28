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
exports.ListingImage = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const listing_entity_1 = require("./listing.entity");
let ListingImage = class ListingImage extends typeorm_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, imageUrl: { required: true, type: () => String }, listing: { required: true, type: () => require("./listing.entity").Listing } };
    }
};
exports.ListingImage = ListingImage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ListingImage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ListingImage.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => listing_entity_1.Listing, (listing) => listing.images, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", listing_entity_1.Listing)
], ListingImage.prototype, "listing", void 0);
exports.ListingImage = ListingImage = __decorate([
    (0, typeorm_1.Entity)('ListingImage')
], ListingImage);
//# sourceMappingURL=listing-image.entity.js.map