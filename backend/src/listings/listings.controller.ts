import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ListingsService } from './services/listings.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PublishListingDto } from './dto/publish-listing.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IListing } from './dto/get-all-listing.dto';
import { Throttle } from '@nestjs/throttler';
import { GetAllQueryDto } from './dto/get-all-query.dto';
import { IFilter } from './dto/filter-inteface';
import { IListingExtended } from './dto/get-by-uuid-listing.dto';

const MAX_IMAGES = 10;

@Controller('listings')
@ApiTags('Listings')
export class ListingsController {
  constructor(private listingService: ListingsService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new listing',
    type: PublishListingDto,
  })
  @UseInterceptors(FilesInterceptor('createImages', MAX_IMAGES))
  async publish(
    @Req() req: Request,
    @Body() body: any,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<{ uuid: string }> {
    const publishListingDto: PublishListingDto = {
      createListing: JSON.parse(body.createListing),
      createLocation: JSON.parse(body.createLocation),
      createImages: files.map((file) => ({ file })),
      createAmenities: body.createAmenities
        ? JSON.parse(body.createAmenities)
        : [],
      createRooms: body.createRooms ? JSON.parse(body.createRooms) : [],
    };

    publishListingDto.createListing.user = (req as any).user;
    return { uuid: await this.listingService.publish(publishListingDto) };
  }

  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @Get()
  async getAll(@Query() body: GetAllQueryDto): Promise<IListing[]> {
    const filter: IFilter = {
      type: body.type,
      constructionType: body.constructionType,
      minPrice: body.minPrice,
      maxPrice: body.maxPrice,
      minSurfaceArea: body.minSurfaceArea,
      maxSurfaceArea: body.maxSurfaceArea,
      minYear: body.minYear,
      maxYear: body.maxYear,
      minBedrooms: body.minBedrooms,
      maxBedrooms: body.maxBedrooms,
      minBathrooms: body.minBathrooms,
      maxBathrooms: body.maxBathrooms,
      minOtherRooms: body.minOtherRooms,
      maxOtherRooms: body.maxOtherRooms,
      minFloors: body.minFloors,
      maxFloors: body.maxFloors,
      amenities:
        typeof body.amenities === 'string' ? [body.amenities] : body.amenities,
    };
    return this.listingService.getAll(filter, body.sort, body.search);
  }

  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @Get(':uuid')
  async getByUUID(@Param('uuid') uuid: string): Promise<IListingExtended> {
    return this.listingService.getByUUID(uuid);
  }
}
