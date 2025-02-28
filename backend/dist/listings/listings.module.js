"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingsModule = void 0;
const common_1 = require("@nestjs/common");
const listings_service_1 = require("./services/listings.service");
const listings_controller_1 = require("./listings.controller");
const typeorm_1 = require("@nestjs/typeorm");
const listing_entity_1 = require("./entity/listing.entity");
const listing_image_entity_1 = require("./entity/listing-image.entity");
const listing_location_entity_1 = require("./entity/listing-location.entity");
const listing_view_entity_1 = require("./entity/listing-view.entity");
const listing_room_entity_1 = require("./entity/listing-room.entity");
const listing_amenity_entity_1 = require("./entity/listing-amenity.entity");
const listing_price_history_entity_1 = require("./entity/listing-price-history.entity");
const aws_module_1 = require("../aws/aws.module");
const listing_locations_service_1 = require("./services/listing-locations.service");
const listing_images_service_1 = require("./services/listing-images.service");
const listing_amenities_service_1 = require("./services/listing-amenities.service");
const listing_rooms_service_1 = require("./services/listing-rooms.service");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const listing_views_service_1 = require("./services/listing-views.service");
const listing_favourite_entity_1 = require("./entity/listing-favourite.entity");
let ListingsModule = class ListingsModule {
};
exports.ListingsModule = ListingsModule;
exports.ListingsModule = ListingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                listing_entity_1.Listing,
                listing_image_entity_1.ListingImage,
                listing_location_entity_1.ListingLocation,
                listing_view_entity_1.ListingView,
                listing_room_entity_1.ListingRoom,
                listing_amenity_entity_1.ListingAmenity,
                listing_price_history_entity_1.ListingPriceHistory,
                listing_favourite_entity_1.ListingFavourite,
            ]),
            aws_module_1.AwsModule,
        ],
        providers: [
            listings_service_1.ListingsService,
            listing_locations_service_1.ListingLocationsService,
            listing_images_service_1.ListingImagesService,
            listing_amenities_service_1.ListingAmenitiesService,
            listing_rooms_service_1.ListingRoomsService,
            listing_views_service_1.ListingViewsService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
        controllers: [listings_controller_1.ListingsController],
        exports: [listing_images_service_1.ListingImagesService, listings_service_1.ListingsService],
    })
], ListingsModule);
//# sourceMappingURL=listings.module.js.map