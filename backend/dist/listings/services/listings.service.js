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
exports.ListingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const listing_entity_1 = require("../entity/listing.entity");
const listing_locations_service_1 = require("./listing-locations.service");
const listing_images_service_1 = require("./listing-images.service");
const listing_amenities_service_1 = require("./listing-amenities.service");
const listing_rooms_service_1 = require("./listing-rooms.service");
const room_type_dto_1 = require("../types/room-type.dto");
const sort_type_type_1 = require("../types/sort-type.type");
const listing_views_service_1 = require("./listing-views.service");
const listing_favourite_entity_1 = require("../entity/listing-favourite.entity");
let ListingsService = class ListingsService {
    constructor(listingRepository, listingLocationsService, listingImagesService, listingAmenitiesService, listingRoomsService, listingViewsService, listingFavouriteRepository) {
        this.listingRepository = listingRepository;
        this.listingLocationsService = listingLocationsService;
        this.listingImagesService = listingImagesService;
        this.listingAmenitiesService = listingAmenitiesService;
        this.listingRoomsService = listingRoomsService;
        this.listingViewsService = listingViewsService;
        this.listingFavouriteRepository = listingFavouriteRepository;
    }
    async create(createListingDto) {
        const newListing = this.listingRepository.create(createListingDto);
        return newListing.save();
    }
    async findById(id) {
        return this.listingRepository.findOneBy({ id });
    }
    async findByUuid(uuid) {
        return this.listingRepository.findOne({
            where: { uuid },
            relations: ['user'],
        });
    }
    async getByUser(user) {
        return this.listingRepository.find({
            where: { user },
        });
    }
    async publish(publishListingDto) {
        const newListing = await this.create(publishListingDto.listing);
        publishListingDto.location.listing = newListing;
        await this.listingLocationsService.create(publishListingDto.location);
        publishListingDto.images.forEach(async (createListingImageDto) => {
            createListingImageDto.listing = newListing;
            await this.listingImagesService.create(createListingImageDto);
        });
        publishListingDto.amenities.forEach(async (createAmenitiesDto) => {
            createAmenitiesDto.listing = newListing;
            await this.listingAmenitiesService.create(createAmenitiesDto);
        });
        publishListingDto.rooms.forEach(async (createListingRoomDto) => {
            createListingRoomDto.listing = newListing;
            await this.listingRoomsService.create(createListingRoomDto);
        });
        return newListing.uuid;
    }
    getNumberOfRooms(listing, roomType) {
        const result = listing.rooms
            .filter((room) => room.type === roomType)
            .reduce((sum, room) => sum + room.amount, 0);
        return result || 0;
    }
    async getAll(filter, sort, search, user) {
        const query = this.listingRepository.createQueryBuilder('listing');
        query
            .leftJoinAndSelect('listing.images', 'images')
            .leftJoinAndSelect('listing.location', 'location')
            .leftJoinAndSelect('listing.rooms', 'rooms')
            .leftJoinAndSelect('listing.amenities', 'amenities')
            .leftJoinAndSelect('listing.favourites', 'favourites')
            .leftJoinAndSelect('favourites.user', 'favouriteUser');
        if (search) {
            query.andWhere(`LOWER(CONCAT(location.streetName, ' ', location.streetNumber, ', ', location.postalCode, ', ', location.city, ', ', location.country)) LIKE :search`, { search: `%${search.toLowerCase()}%` });
        }
        if (filter) {
            if (filter.type) {
                query.andWhere('listing.type = :type', { type: filter.type });
            }
            if (filter.constructionType) {
                query.andWhere('listing.constructionType = :constructionType', {
                    constructionType: filter.constructionType,
                });
            }
            if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
                if (filter.minPrice !== undefined && filter.maxPrice !== undefined) {
                    query.andWhere('listing.price BETWEEN :minPrice AND :maxPrice', {
                        minPrice: filter.minPrice,
                        maxPrice: filter.maxPrice,
                    });
                }
                else if (filter.minPrice !== undefined) {
                    query.andWhere('listing.price >= :minPrice', {
                        minPrice: filter.minPrice,
                    });
                }
                else if (filter.maxPrice !== undefined) {
                    query.andWhere('listing.price <= :maxPrice', {
                        maxPrice: filter.maxPrice,
                    });
                }
            }
            if (filter.minSurfaceArea !== undefined ||
                filter.maxSurfaceArea !== undefined) {
                if (filter.minSurfaceArea !== undefined &&
                    filter.maxSurfaceArea !== undefined) {
                    query.andWhere('listing.livingSurface BETWEEN :minSurface AND :maxSurface', {
                        minSurface: filter.minSurfaceArea,
                        maxSurface: filter.maxSurfaceArea,
                    });
                }
                else if (filter.minSurfaceArea !== undefined) {
                    query.andWhere('listing.livingSurface >= :minSurface', {
                        minSurface: filter.minSurfaceArea,
                    });
                }
                else if (filter.maxSurfaceArea !== undefined) {
                    query.andWhere('listing.livingSurface <= :maxSurface', {
                        maxSurface: filter.maxSurfaceArea,
                    });
                }
            }
            if (filter.minYear !== undefined || filter.maxYear !== undefined) {
                query.andWhere('listing.constructionYear BETWEEN :minYear AND :maxYear', {
                    minYear: filter.minYear || 0,
                    maxYear: filter.maxYear || new Date().getFullYear(),
                });
            }
            for (const roomType of Object.values(room_type_dto_1.RoomType)) {
                const minKey = `min${roomType}`;
                const maxKey = `max${roomType}`;
                if (filter[minKey] !== undefined || filter[maxKey] !== undefined) {
                    query.andWhere(`rooms.type = :roomType AND rooms.amount BETWEEN :minAmount AND :maxAmount`, {
                        roomType,
                        minAmount: filter[minKey] || 0,
                        maxAmount: filter[maxKey] || Number.MAX_SAFE_INTEGER,
                    });
                }
            }
            if (filter.amenities && filter.amenities.length > 0) {
                query.andWhere((subQuery) => {
                    const sub = subQuery
                        .subQuery()
                        .select('COUNT(la.id)', 'amenitiesCount')
                        .from('ListingAmenity', 'la')
                        .where('la.listingId = listing.id')
                        .andWhere('la.type IN (:...amenities)', {
                        amenities: filter.amenities,
                    });
                    return `${sub.getQuery()} = :requiredCount`;
                }, { requiredCount: filter.amenities.length });
            }
            switch (sort) {
                case sort_type_type_1.SortType.PRICE_ASC:
                    query.orderBy('listing.price', 'ASC');
                    break;
                case sort_type_type_1.SortType.PRICE_DESC:
                    query.orderBy('listing.price', 'DESC');
                    break;
                case sort_type_type_1.SortType.SURFACE_AREA_ASC:
                    query.orderBy('listing.livingSurface', 'ASC');
                    break;
                case sort_type_type_1.SortType.SURFACE_AREA_DESC:
                    query.orderBy('listing.livingSurface', 'DESC');
                    break;
                case sort_type_type_1.SortType.CONSTRUCTION_YEAR_ASC:
                    query.orderBy('listing.constructionYear', 'ASC');
                    break;
                case sort_type_type_1.SortType.CONSTRUCTION_YEAR_DESC:
                    query.orderBy('listing.constructionYear', 'DESC');
                    break;
                case sort_type_type_1.SortType.NEWEST:
                    query.orderBy('listing.createdAt', 'DESC');
                    break;
                case sort_type_type_1.SortType.OLDEST:
                    query.orderBy('listing.createdAt', 'ASC');
                    break;
            }
            const listings = await query.getMany();
            return listings.map((listing) => {
                const formattedAddress = `${listing.location.streetName} ${listing.location.streetNumber}, ${listing.location.postalCode}, ${listing.location.city}, ${listing.location.country}`;
                const isFavourited = user
                    ? listing.favourites.some((fav) => fav.user?.id === user.id)
                    : false;
                return {
                    uuid: listing.uuid,
                    address: formattedAddress,
                    imageUrl: listing.images[0]?.imageUrl || '',
                    type: listing.type,
                    constructionType: listing.constructionType,
                    numberOfBedrooms: this.getNumberOfRooms(listing, room_type_dto_1.RoomType.BEDROOM),
                    numberOfBathrooms: this.getNumberOfRooms(listing, room_type_dto_1.RoomType.BATHROOM),
                    numberOfFloors: this.getNumberOfRooms(listing, room_type_dto_1.RoomType.FLOOR),
                    surfaceArea: listing.livingSurface,
                    price: listing.price,
                    isFavourited,
                };
            });
        }
    }
    async getByUUID(uuid, user) {
        const listing = await this.listingRepository.findOne({
            where: { uuid },
            relations: [
                'location',
                'images',
                'amenities',
                'rooms',
                'user',
                'favourites',
                'favourites.user',
            ],
        });
        await this.listingViewsService.create(listing);
        const formattedAddress = `${listing.location.streetName} ${listing.location.streetNumber}, ${listing.location.postalCode}, ${listing.location.city}, ${listing.location.country}`;
        const isFavourited = user
            ? listing.favourites.some((fav) => fav.user?.id === user.id)
            : false;
        return {
            userId: listing.user.id,
            userFullName: listing.user.fullName,
            userImage: listing.user.imageUrl,
            address: formattedAddress,
            images: listing.images.map((image) => image.imageUrl),
            type: listing.type,
            constructionType: listing.constructionType,
            numberOfBedrooms: this.getNumberOfRooms(listing, room_type_dto_1.RoomType.BEDROOM),
            numberOfBathrooms: this.getNumberOfRooms(listing, room_type_dto_1.RoomType.BATHROOM),
            numberOfOtherRooms: this.getNumberOfRooms(listing, room_type_dto_1.RoomType.OTHER),
            numberOfFloors: this.getNumberOfRooms(listing, room_type_dto_1.RoomType.FLOOR),
            surfaceArea: listing.livingSurface,
            price: listing.price,
            description: listing.description,
            amenities: listing.amenities.map((amenity) => amenity.type),
            longitude: listing.location.longitude,
            latitude: listing.location.latitude,
            constructionYear: listing.constructionYear,
            isFavourited,
        };
    }
    async getForEditingByUUID(uuid, user) {
        const listing = await this.listingRepository.findOne({
            where: { uuid },
            relations: ['location', 'images', 'amenities', 'rooms', 'user'],
        });
        if (listing.user.id !== user.id) {
            throw new common_1.UnauthorizedException();
        }
        return {
            address: {
                streetNumber: listing.location.streetNumber,
                streetName: listing.location.streetName,
                postalCode: listing.location.postalCode,
                city: listing.location.city,
                country: listing.location.country,
                state: listing.location.state,
            },
            location: {
                longitude: listing.location.longitude,
                latitude: listing.location.latitude,
            },
            images: listing.images.map((image) => image.imageUrl),
            rooms: {
                numberOfBedrooms: String(this.getNumberOfRooms(listing, room_type_dto_1.RoomType.BEDROOM)),
                numberOfBathrooms: String(this.getNumberOfRooms(listing, room_type_dto_1.RoomType.BATHROOM)),
                numberOfOtherRooms: String(this.getNumberOfRooms(listing, room_type_dto_1.RoomType.OTHER)),
                numberOfFloors: String(this.getNumberOfRooms(listing, room_type_dto_1.RoomType.FLOOR)),
            },
            amenities: listing.amenities.map((amenity) => amenity.type),
            general: {
                constructionType: listing.constructionType,
                constructionYear: String(listing.constructionYear),
                surfaceArea: String(listing.livingSurface),
                price: String(listing.price),
                description: listing.description,
                type: listing.type,
            },
        };
    }
    async getTopViewed() {
        const listings = await this.listingRepository
            .createQueryBuilder('listing')
            .leftJoin('listing.images', 'images')
            .leftJoin('listing.location', 'location')
            .leftJoin('listing.views', 'views')
            .select([
            'listing.id AS id',
            'listing.uuid AS uuid',
            'listing.price AS price',
            'listing.type AS type',
            'MAX(location.city) AS city',
            'MAX(location.country) AS country',
            "COALESCE(MIN(images.imageUrl), '') AS imageUrl",
            'COUNT(views.id) AS view_count',
        ])
            .groupBy('listing.id')
            .addGroupBy('listing.uuid')
            .orderBy('view_count', 'DESC')
            .limit(5)
            .getRawMany();
        return listings.map((listing) => ({
            uuid: listing.uuid,
            price: listing.price,
            location: `${listing.city}, ${listing.country}`,
            imageUrl: listing.imageurl || '',
            type: listing.type,
        }));
    }
    async deleteByUuid(uuid, req) {
        const { id } = req.user;
        const listing = await this.listingRepository.findOne({
            where: { uuid },
            relations: ['user'],
        });
        if (listing.user.id !== id) {
            throw new common_1.UnauthorizedException('You are not authorized to delete this listing.');
        }
        await this.listingRepository.remove(listing);
    }
    async updateListingByUuid(uuid, updateData) {
        const listing = await this.listingRepository.findOne({
            where: { uuid },
            relations: ['user', 'images', 'location', 'amenities', 'rooms'],
        });
        if (listing.user.id !== updateData.listing.user.id) {
            throw new common_1.UnauthorizedException('You are not authorized to update this listing.');
        }
        Object.assign(listing, {
            description: updateData.listing.description ?? listing.description,
            price: updateData.listing.price ?? listing.price,
            livingSurface: updateData.listing.livingSurface ?? listing.livingSurface,
            constructionYear: updateData.listing.constructionYear ?? listing.constructionYear,
            constructionType: updateData.listing.constructionType ?? listing.constructionType,
            type: updateData.listing.type ?? listing.type,
        });
        Object.assign(listing.location, {
            streetNumber: updateData.location.streetNumber ?? listing.location.streetNumber,
            streetName: updateData.location.streetName ?? listing.location.streetName,
            postalCode: updateData.location.postalCode ?? listing.location.postalCode,
            city: updateData.location.city ?? listing.location.city,
            state: updateData.location.state ?? listing.location.state,
            country: updateData.location.country ?? listing.location.country,
            longitude: updateData.location.longitude ?? listing.location.longitude,
            latitude: updateData.location.latitude ?? listing.location.latitude,
        });
        if (updateData.rooms.length > 0) {
            listing.rooms.forEach((room) => {
                const roomToUpdate = updateData.rooms.find((r) => r.type === room.type);
                if (roomToUpdate) {
                    room.amount = roomToUpdate.amount;
                }
            });
        }
        updateData.images.forEach((image) => {
            image.listing = listing;
            this.listingImagesService.create(image);
        });
        updateData.amenities.forEach((amenity) => {
            const alreadyExists = listing.amenities.find((a) => a.type === amenity.type);
            if (alreadyExists)
                return;
            amenity.listing = listing;
            this.listingAmenitiesService.create(amenity);
        });
        updateData.deletedImages.forEach((image) => {
            this.listingImagesService.delete(image.imageUrl, listing);
        });
        updateData.deletedAmenities.forEach((amenity) => {
            const alreadyExists = listing.amenities.find((a) => a.type === amenity.type);
            if (!alreadyExists)
                return;
            this.listingAmenitiesService.delete(alreadyExists);
        });
        await this.listingRepository.save(listing);
        return uuid;
    }
    async favourite(uuid, req) {
        const user = req.user;
        const listing = await this.listingRepository.findOne({
            where: { uuid },
            relations: ['user'],
        });
        if (listing.user.id === user.id) {
            throw new common_1.BadRequestException('You cannot favourite your own listing.');
        }
        const alreadyExisting = await this.listingFavouriteRepository.findOneBy({
            listing: { uuid: listing.uuid },
            user: { id: user.id },
        });
        if (alreadyExisting)
            throw new common_1.BadRequestException('Listing already favourited.');
        const favourite = this.listingFavouriteRepository.create({
            listing,
            user,
        });
        await favourite.save();
    }
    async deleteFavourite(uuid, req) {
        const user = req.user;
        const listing = await this.listingRepository.findOne({
            where: { uuid },
            relations: ['user'],
        });
        if (listing.user.id === user.id) {
            throw new common_1.BadRequestException('You cannot favourite your own listing.');
        }
        const alreadyExisting = await this.listingFavouriteRepository.findOneBy({
            listing: { uuid: listing.uuid },
            user: { id: user.id },
        });
        if (!alreadyExisting)
            throw new common_1.BadRequestException('You have not favourited this listing.');
        await this.listingFavouriteRepository.remove(alreadyExisting);
    }
    async getMapListings() {
        const listings = await this.listingRepository.find({
            select: ['uuid', 'location', 'location', 'price', 'type', 'images'],
            relations: ['images', 'location'],
        });
        return listings.map((listing) => ({
            uuid: listing.uuid,
            lat: listing.location.latitude,
            lng: listing.location.longitude,
            price: listing.price,
            type: listing.type,
            imageUrl: listing.images[0].imageUrl,
        }));
    }
};
exports.ListingsService = ListingsService;
exports.ListingsService = ListingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(listing_entity_1.Listing)),
    __param(6, (0, typeorm_1.InjectRepository)(listing_favourite_entity_1.ListingFavourite)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        listing_locations_service_1.ListingLocationsService,
        listing_images_service_1.ListingImagesService,
        listing_amenities_service_1.ListingAmenitiesService,
        listing_rooms_service_1.ListingRoomsService,
        listing_views_service_1.ListingViewsService,
        typeorm_2.Repository])
], ListingsService);
//# sourceMappingURL=listings.service.js.map