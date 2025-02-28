import { Repository } from 'typeorm';
import { ListingLocation } from '../entity/listing-location.entity';
import { ListingLocationDto } from '../dto/listing-location.dto';
export declare class ListingLocationsService {
    private listingLocationRepository;
    constructor(listingLocationRepository: Repository<ListingLocation>);
    create(createListingLocationDto: ListingLocationDto): Promise<ListingLocation>;
    getAll(): Promise<ListingLocation[]>;
    getAllByListingUuid(listingUuid: string): Promise<ListingLocation>;
}
