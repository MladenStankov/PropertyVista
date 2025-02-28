import { Repository } from 'typeorm';
import { ListingImage } from '../entity/listing-image.entity';
import { AwsService } from 'src/aws/aws.service';
import { ListingImageDto } from '../dto/listing-image.dto';
import { Listing } from '../entity/listing.entity';
export declare class ListingImagesService {
    private listingImageRepository;
    private awsService;
    constructor(listingImageRepository: Repository<ListingImage>, awsService: AwsService);
    create(createListingImageDto: ListingImageDto): Promise<ListingImage>;
    delete(image: string, listing: Listing): Promise<void>;
    getAllByListingUuid(listingUuid: string): Promise<ListingImage[]>;
    getAllFileNames(): Promise<string[]>;
}
