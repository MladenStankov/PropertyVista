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
exports.ListingView = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const listing_entity_1 = require("./listing.entity");
let ListingView = class ListingView extends typeorm_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, listing: { required: true, type: () => require("./listing.entity").Listing }, createdAt: { required: true, type: () => Date } };
    }
};
exports.ListingView = ListingView;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ListingView.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => listing_entity_1.Listing, (listing) => listing.views, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", listing_entity_1.Listing)
], ListingView.prototype, "listing", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], ListingView.prototype, "createdAt", void 0);
exports.ListingView = ListingView = __decorate([
    (0, typeorm_1.Entity)('ListingView')
], ListingView);
//# sourceMappingURL=listing-view.entity.js.map