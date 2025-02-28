import { ListingsService } from './services/listings.service';
import { IListing } from './dto/get-all-listing.dto';
import { GetAllQueryDto } from './dto/get-all-query.dto';
import { IListingExtended } from './dto/get-by-uuid-listing.dto';
import { MostViewedListingsDto } from './dto/most-viewed-listings.dto';
import { Request } from 'express';
import { IForEditing } from './dto/get-for-editing.dto';
import { IMapListing } from './dto/map-listings.dto';
export declare class ListingsController {
    private listingService;
    constructor(listingService: ListingsService);
    publish(req: Request, body: any, files: Express.Multer.File[]): Promise<{
        uuid: string;
    }>;
    getAll(body: GetAllQueryDto, req: Request): Promise<IListing[]>;
    getTopViewed(): Promise<MostViewedListingsDto[]>;
    getByUUID(uuid: string, req: Request): Promise<IListingExtended>;
    getForEditingByUUID(uuid: string, req: Request): Promise<IForEditing>;
    deleteByUUID(uuid: string, req: Request): Promise<void>;
    patchListing(uuid: string, body: any, files: Express.Multer.File[], req: Request): Promise<{
        uuid: string;
    }>;
    favourite(uuid: string, req: Request): Promise<void>;
    deleteFavourite(uuid: string, req: Request): Promise<void>;
    getMapListings(): Promise<IMapListing[]>;
    private safeParse;
}
