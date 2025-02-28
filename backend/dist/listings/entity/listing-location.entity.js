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
exports.ListingLocation = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const listing_entity_1 = require("./listing.entity");
let ListingLocation = class ListingLocation extends typeorm_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, streetNumber: { required: true, type: () => String }, streetName: { required: true, type: () => String }, postalCode: { required: true, type: () => String }, city: { required: true, type: () => String }, state: { required: true, type: () => String }, country: { required: true, type: () => String }, longitude: { required: true, type: () => Number }, latitude: { required: true, type: () => Number }, listing: { required: true, type: () => require("./listing.entity").Listing } };
    }
};
exports.ListingLocation = ListingLocation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ListingLocation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ListingLocation.prototype, "streetNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ListingLocation.prototype, "streetName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ListingLocation.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ListingLocation.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ListingLocation.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ListingLocation.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], ListingLocation.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], ListingLocation.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => listing_entity_1.Listing, (listing) => listing.location, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", listing_entity_1.Listing)
], ListingLocation.prototype, "listing", void 0);
exports.ListingLocation = ListingLocation = __decorate([
    (0, typeorm_1.Entity)('ListingLocation')
], ListingLocation);
//# sourceMappingURL=listing-location.entity.js.map