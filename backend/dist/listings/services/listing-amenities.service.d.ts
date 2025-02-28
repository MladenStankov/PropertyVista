import { ListingAmenity } from '../entity/listing-amenity.entity';
import { Repository } from 'typeorm';
import { ListingAmenityDto } from '../dto/listing-amenity.dto';
export declare class ListingAmenitiesService {
    private listingAmenityRepository;
    constructor(listingAmenityRepository: Repository<ListingAmenity>);
    create(AmenityDto: ListingAmenityDto): Promise<ListingAmenity>;
    delete(amenity: ListingAmenity): Promise<void>;
    getAllByListingUuid(listingUuid: string): Promise<ListingAmenity[]>;
}
