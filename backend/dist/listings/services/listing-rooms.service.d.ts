import { ListingRoom } from '../entity/listing-room.entity';
import { Repository } from 'typeorm';
import { ListingRoomDto } from '../dto/listing-room.dto';
export declare class ListingRoomsService {
    private listingRoomRepository;
    constructor(listingRoomRepository: Repository<ListingRoom>);
    create(createListingRoomDto: ListingRoomDto): Promise<ListingRoom>;
    getAllByListingUuid(listingUuid: string): Promise<ListingRoom[]>;
}
