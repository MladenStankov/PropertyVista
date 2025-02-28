import { Listing } from '../entity/listing.entity';
export declare class ListingImageDto {
    file: Express.Multer.File;
    listing?: Listing;
}
