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
exports.ListingFavourite = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const listing_entity_1 = require("./listing.entity");
const user_entity_1 = require("../../users/entity/user.entity");
let ListingFavourite = class ListingFavourite extends typeorm_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, listing: { required: true, type: () => require("./listing.entity").Listing }, user: { required: true, type: () => require("../../users/entity/user.entity").User } };
    }
};
exports.ListingFavourite = ListingFavourite;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ListingFavourite.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => listing_entity_1.Listing, (listing) => listing.favourites, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", listing_entity_1.Listing)
], ListingFavourite.prototype, "listing", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.favourites, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], ListingFavourite.prototype, "user", void 0);
exports.ListingFavourite = ListingFavourite = __decorate([
    (0, typeorm_1.Entity)('ListingFavourite')
], ListingFavourite);
//# sourceMappingURL=listing-favourite.entity.js.map