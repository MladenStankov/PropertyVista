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
exports.ListingImagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const listing_image_entity_1 = require("../entity/listing-image.entity");
const aws_service_1 = require("../../aws/aws.service");
let ListingImagesService = class ListingImagesService {
    constructor(listingImageRepository, awsService) {
        this.listingImageRepository = listingImageRepository;
        this.awsService = awsService;
    }
    async create(createListingImageDto) {
        const imageUrl = await this.awsService.uploadFile(createListingImageDto.file);
        const newListingImage = this.listingImageRepository.create({
            imageUrl,
            listing: createListingImageDto.listing,
        });
        return newListingImage.save();
    }
    async delete(image, listing) {
        const imageDB = await this.listingImageRepository.findOne({
            where: { imageUrl: image },
        });
        if (!imageDB) {
            return;
        }
        await this.awsService.deleteFile(image);
        await imageDB.remove();
    }
    async getAllByListingUuid(listingUuid) {
        return this.listingImageRepository.find({
            where: { listing: { uuid: listingUuid } },
        });
    }
    async getAllFileNames() {
        return (await this.listingImageRepository.find()).map((image) => image.imageUrl);
    }
};
exports.ListingImagesService = ListingImagesService;
exports.ListingImagesService = ListingImagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(listing_image_entity_1.ListingImage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        aws_service_1.AwsService])
], ListingImagesService);
//# sourceMappingURL=listing-images.service.js.map