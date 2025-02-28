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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const chat_entity_1 = require("../entity/chat.entity");
const typeorm_2 = require("@nestjs/typeorm");
const listings_service_1 = require("../../listings/services/listings.service");
const users_service_1 = require("../../users/users.service");
let ChatService = class ChatService {
    constructor(chatRepository, listingsService, userService) {
        this.chatRepository = chatRepository;
        this.listingsService = listingsService;
        this.userService = userService;
    }
    async createChat(homeSeekerId, listingUuid) {
        const listing = await this.listingsService.findByUuid(listingUuid);
        if (listing == null)
            throw new common_1.BadRequestException('Listing not found.');
        const brokerId = listing.user.id;
        if (brokerId === homeSeekerId)
            throw new common_1.BadRequestException('You cannot chat with yourself.');
        const broker = await this.userService.findById(brokerId);
        if (broker == null)
            throw new common_1.BadRequestException('Broker not found.');
        const homeSeeker = await this.userService.findById(homeSeekerId);
        if (homeSeeker == null)
            throw new common_1.BadRequestException('Home Seeker not found.');
        const existingChat = await this.chatRepository.findOne({
            where: {
                broker: { id: brokerId },
                homeSeeker: { id: homeSeekerId },
            },
        });
        if (existingChat) {
            return { uuid: existingChat.uuid };
        }
        const chat = this.chatRepository.create({
            broker: broker,
            homeSeeker: homeSeeker,
            listing,
        });
        return { uuid: (await this.chatRepository.save(chat)).uuid };
    }
    async getChats(userId) {
        const brokerChats = await this.chatRepository.find({
            where: [{ broker: { id: userId } }],
            relations: ['homeSeeker', 'messages', 'messages.sender'],
        });
        const homeSeekingChats = await this.chatRepository.find({
            where: [{ homeSeeker: { id: userId } }],
            relations: [
                'listing',
                'listing.images',
                'listing.location',
                'messages',
                'messages.sender',
            ],
        });
        return {
            brokerChats: brokerChats.map((chat) => ({
                uuid: chat.uuid,
                homeSeekerImage: chat.homeSeeker.imageUrl,
                homeSeekerFullName: chat.homeSeeker.fullName,
                lastMessage: chat.messages[chat.messages.length - 1]?.message || 'No messages yet',
                lastMessageBy: chat.messages[chat.messages.length - 1]?.sender.fullName || '',
            })),
            homeSeekingChats: homeSeekingChats.map((chat) => ({
                uuid: chat.uuid,
                listingImageUrl: chat.listing.images[0].imageUrl,
                listingAddress: `${chat.listing.location.streetName} ${chat.listing.location.streetNumber} ${chat.listing.location.postalCode} ${chat.listing.location.city} ${chat.listing.location.country}`,
                lastMessage: chat.messages[chat.messages.length - 1]?.message || 'No messages yet',
                lastMessageBy: chat.messages[chat.messages.length - 1]?.sender.fullName || '',
            })),
        };
    }
    async getChatMessages(chatUuid, currentUserId) {
        const chat = await this.chatRepository.findOne({
            where: { uuid: chatUuid },
            relations: ['messages', 'messages.sender'],
        });
        const groupedMessages = [];
        chat.messages
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            .reduce((acc, current) => {
            const lastGroup = acc[acc.length - 1];
            if (lastGroup && lastGroup.userFullName === current.sender.fullName) {
                lastGroup.messages.push({
                    message: current.message,
                    createdAt: current.createdAt,
                });
            }
            else {
                acc.push({
                    userFullName: current.sender.fullName,
                    userImage: current.sender.imageUrl,
                    currentUser: current.sender.id === currentUserId,
                    senderId: current.sender.id,
                    messages: [
                        {
                            message: current.message,
                            createdAt: current.createdAt,
                        },
                    ],
                });
            }
            return acc;
        }, groupedMessages);
        return groupedMessages;
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(chat_entity_1.Chat)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        listings_service_1.ListingsService,
        users_service_1.UsersService])
], ChatService);
//# sourceMappingURL=chat.service.js.map