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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const listings_service_1 = require("./services/listings.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const publish_listing_dto_1 = require("./dto/publish-listing.dto");
const platform_express_1 = require("@nestjs/platform-express");
const throttler_1 = require("@nestjs/throttler");
const get_all_query_dto_1 = require("./dto/get-all-query.dto");
const update_listing_dto_1 = require("./dto/update-listing.dto");
const jwt_optional_guard_1 = require("../auth/guards/jwt-optional.guard");
const MAX_IMAGES = 50;
let ListingsController = class ListingsController {
    constructor(listingService) {
        this.listingService = listingService;
    }
    async publish(req, body, files) {
        const publishListingDto = {
            listing: JSON.parse(body.listing),
            location: JSON.parse(body.location),
            images: files.map((file) => ({ file })),
            amenities: body.amenities ? JSON.parse(body.amenities) : [],
            rooms: body.rooms ? JSON.parse(body.rooms) : [],
        };
        publishListingDto.listing.user = req.user;
        return { uuid: await this.listingService.publish(publishListingDto) };
    }
    async getAll(body, req) {
        const filter = {
            type: body.type,
            constructionType: body.constructionType,
            minPrice: body.minPrice,
            maxPrice: body.maxPrice,
            minSurfaceArea: body.minSurfaceArea,
            maxSurfaceArea: body.maxSurfaceArea,
            minYear: body.minYear,
            maxYear: body.maxYear,
            minBedrooms: body.minBedrooms,
            maxBedrooms: body.maxBedrooms,
            minBathrooms: body.minBathrooms,
            maxBathrooms: body.maxBathrooms,
            minOtherRooms: body.minOtherRooms,
            maxOtherRooms: body.maxOtherRooms,
            minFloors: body.minFloors,
            maxFloors: body.maxFloors,
            amenities: typeof body.amenities === 'string' ? [body.amenities] : body.amenities,
        };
        return this.listingService.getAll(filter, body.sort, body.search, req.user);
    }
    async getTopViewed() {
        return this.listingService.getTopViewed();
    }
    async getByUUID(uuid, req) {
        return this.listingService.getByUUID(uuid, req.user);
    }
    async getForEditingByUUID(uuid, req) {
        return this.listingService.getForEditingByUUID(uuid, req.user);
    }
    async deleteByUUID(uuid, req) {
        return this.listingService.deleteByUuid(uuid, req);
    }
    async patchListing(uuid, body, files, req) {
        const updateListingDto = {
            listing: this.safeParse(body.listing),
            location: this.safeParse(body.location),
            images: files ? files.map((file) => ({ file })) : [],
            deletedImages: body.deletedImages
                ? this.safeParse(body.deletedImages)
                : [],
            amenities: body.amenities ? this.safeParse(body.amenities) : [],
            deletedAmenities: body.deletedAmenities
                ? this.safeParse(body.deletedAmenities)
                : [],
            rooms: body.rooms ? this.safeParse(body.rooms) : [],
        };
        updateListingDto.listing.user = req.user;
        return {
            uuid: await this.listingService.updateListingByUuid(uuid, updateListingDto),
        };
    }
    async favourite(uuid, req) {
        return this.listingService.favourite(uuid, req);
    }
    async deleteFavourite(uuid, req) {
        return this.listingService.deleteFavourite(uuid, req);
    }
    async getMapListings() {
        return this.listingService.getMapListings();
    }
    safeParse(jsonString) {
        try {
            return JSON.parse(jsonString);
        }
        catch {
            return {};
        }
    }
};
exports.ListingsController = ListingsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Create a new listing',
        type: publish_listing_dto_1.PublishListingDto,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', MAX_IMAGES)),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Array]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "publish", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 100, ttl: 1000 } }),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_optional_guard_1.JwtOptionalGuard),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_all_query_dto_1.GetAllQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "getAll", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 100, ttl: 1000 } }),
    (0, common_1.Get)('/top-viewed'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "getTopViewed", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 100, ttl: 1000 } }),
    (0, common_1.UseGuards)(jwt_optional_guard_1.JwtOptionalGuard),
    (0, common_1.Get)(':uuid'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "getByUUID", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 100, ttl: 1000 } }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('/for-editing/:uuid'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "getForEditingByUUID", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 1000 } }),
    (0, common_1.Delete)(':uuid'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "deleteByUUID", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 100, ttl: 1000 } }),
    (0, common_1.Patch)(':uuid'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBody)({
        description: 'Update a listing',
        type: update_listing_dto_1.UpdateListingDto,
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', MAX_IMAGES)),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Array, Object]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "patchListing", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 100, ttl: 1000 } }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)('/favourite/:uuid'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "favourite", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 100, ttl: 1000 } }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)('/favourite/:uuid'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "deleteFavourite", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 100, ttl: 1000 } }),
    (0, common_1.Get)('/map/locations'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "getMapListings", null);
exports.ListingsController = ListingsController = __decorate([
    (0, common_1.Controller)('listings'),
    (0, swagger_1.ApiTags)('Listings'),
    __metadata("design:paramtypes", [listings_service_1.ListingsService])
], ListingsController);
//# sourceMappingURL=listings.controller.js.map