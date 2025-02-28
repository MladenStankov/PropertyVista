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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entity/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt_1 = require("bcrypt");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const aws_service_1 = require("../aws/aws.service");
let UsersService = class UsersService {
    constructor(usersRepository, configService, awsService) {
        this.usersRepository = usersRepository;
        this.configService = configService;
        this.awsService = awsService;
    }
    async create(createLocalUserDto) {
        const { fullName, email, password, imageUrl } = createLocalUserDto;
        let hashedPassword;
        if (password) {
            hashedPassword = await (0, bcrypt_1.hash)(password, this.configService.get('BCRYPT_SALT'));
        }
        const newUser = this.usersRepository.create({
            fullName,
            email,
            password: password ? hashedPassword : null,
            imageUrl: imageUrl,
            isVerified: password ? false : true,
        });
        return this.usersRepository.save(newUser);
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({ where: { email } });
    }
    async findById(id) {
        return this.usersRepository.findOne({ where: { id } });
    }
    async findAll() {
        return this.usersRepository.find();
    }
    async getIdByEmail(email) {
        return (await this.usersRepository.findOne({ where: { email }, select: ['id'] })).id;
    }
    async existsByEmail(email) {
        return await this.usersRepository.existsBy({ email });
    }
    async upadatePassword(email, password) {
        const hashedPassword = await (0, bcrypt_1.hash)(password, this.configService.get('BCRYPT_SALT'));
        const user = await this.usersRepository.findOneBy({ email });
        user.password = hashedPassword;
        await user.save();
    }
    async hasPassword(email) {
        const user = await this.usersRepository.findOneBy({ email });
        return user.password ? true : false;
    }
    async deleteExpiredRefreshTokens() {
        await this.usersRepository.delete({
            isVerified: false,
            createdAt: (0, typeorm_2.LessThanOrEqual)(new Date(Date.now() - 30 * 60 * 1000)),
        });
    }
    async profileInfo(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: [
                'listings',
                'favourites',
                'listings.views',
                'listings.favourites',
            ],
        });
        if (!user) {
            throw new Error('User not found');
        }
        const totalListings = user.listings.length;
        const totalFavouritedListings = user.favourites.length;
        const totalReceivedFavourites = user.listings.reduce((sum, listing) => sum + listing.favourites.length, 0);
        const totalViewsOnProfile = user.listings.reduce((sum, listing) => sum + listing.views.length, 0);
        return {
            fullName: user.fullName,
            email: user.email,
            imageUrl: user.imageUrl ?? '',
            totalListings,
            totalChats: 0,
            totalFavouritedListings,
            totalReceivedFavourites,
            totalViewsOnProfile,
        };
    }
    async profileListings(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: [
                'listings',
                'listings.images',
                'listings.views',
                'listings.favourites',
            ],
        });
        return user.listings.map((listing) => ({
            uuid: listing.uuid,
            imageUrl: listing.images[0].imageUrl,
            createdAt: listing.createdAt,
            price: listing.price,
            type: listing.type,
            views: listing.views.length,
            favourites: listing.favourites.length,
        }));
    }
    async profileFavouriteListings(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: [
                'favourites',
                'favourites.listing',
                'favourites.listing.favourites',
                'favourites.listing.images',
                'favourites.listing.views',
            ],
        });
        return user.favourites.map((favourite) => ({
            uuid: favourite.listing.uuid,
            imageUrl: favourite.listing.images[0].imageUrl,
            createdAt: favourite.listing.createdAt,
            price: favourite.listing.price,
            type: favourite.listing.type,
            views: favourite.listing.views.length,
            favourites: favourite.listing.favourites.length,
        }));
    }
    async changeName(fullName, user) {
        user.fullName = fullName;
        await user.save();
    }
    async changeImage(file, user) {
        const oldImage = user.imageUrl;
        const newImage = await this.awsService.uploadFile(file);
        user.imageUrl = newImage;
        if (!oldImage.includes('default-profile-image.png'))
            await this.awsService.deleteFile(oldImage);
        await user.save();
        return { newImage };
    }
};
exports.UsersService = UsersService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "deleteExpiredRefreshTokens", null);
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        aws_service_1.AwsService])
], UsersService);
//# sourceMappingURL=users.service.js.map