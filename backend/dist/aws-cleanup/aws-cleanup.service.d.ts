import { AwsService } from 'src/aws/aws.service';
import { ListingImagesService } from 'src/listings/services/listing-images.service';
export declare class AwsCleanupService {
    private awsService;
    private listingsImageService;
    constructor(awsService: AwsService, listingsImageService: ListingImagesService);
}
