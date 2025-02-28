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
exports.ListingAmenity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const amenity_type_dto_1 = require("../types/amenity-type.dto");
const listing_entity_1 = require("./listing.entity");
let ListingAmenity = class ListingAmenity extends typeorm_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, type: { required: true, enum: require("../types/amenity-type.dto").AmenityType }, listing: { required: true, type: () => require("./listing.entity").Listing } };
    }
};
exports.ListingAmenity = ListingAmenity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ListingAmenity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: amenity_type_dto_1.AmenityType }),
    __metadata("design:type", String)
], ListingAmenity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => listing_entity_1.Listing, (listing) => listing.amenities, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", listing_entity_1.Listing)
], ListingAmenity.prototype, "listing", void 0);
exports.ListingAmenity = ListingAmenity = __decorate([
    (0, typeorm_1.Entity)('ListingAmenity')
], ListingAmenity);
//# sourceMappingURL=listing-amenity.entity.js.map