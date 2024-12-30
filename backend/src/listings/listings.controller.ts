import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { MostViewedListingsDto } from './dto/most-viewed-listings.dto';
import { Request } from 'express';
import { UpdateListingDto } from './dto/update-listing.dto';
import { IForEditing } from './dto/get-for-editing.dto';
import { JwtOptionalGuard } from 'src/auth/guards/jwt-optional.guard';
import { User } from 'src/users/entity/user.entity';

const MAX_IMAGES = 50;

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
  @UseInterceptors(FilesInterceptor('images', MAX_IMAGES))
  async publish(
    @Req() req: Request,
    @Body() body: any,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<{ uuid: string }> {
    const publishListingDto: PublishListingDto = {
      listing: JSON.parse(body.listing),
      location: JSON.parse(body.location),
      images: files.map((file) => ({ file })),
      amenities: body.amenities ? JSON.parse(body.amenities) : [],
      rooms: body.rooms ? JSON.parse(body.rooms) : [],
    };

    publishListingDto.listing.user = (req as any).user;
    return { uuid: await this.listingService.publish(publishListingDto) };
  }

  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @Get()
  @UseGuards(JwtOptionalGuard)
  async getAll(
    @Query() body: GetAllQueryDto,
    @Req() req: Request,
  ): Promise<IListing[]> {
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
    return this.listingService.getAll(
      filter,
      body.sort,
      body.search,
      req.user as User,
    );
  }

  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @Get('/top-viewed')
  async getTopViewed(): Promise<MostViewedListingsDto[]> {
    return this.listingService.getTopViewed();
  }

  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @UseGuards(JwtOptionalGuard)
  @Get(':uuid')
  async getByUUID(
    @Param('uuid') uuid: string,
    @Req() req: Request,
  ): Promise<IListingExtended> {
    return this.listingService.getByUUID(uuid, req.user as User);
  }

  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @UseGuards(JwtGuard)
  @Get('/for-editing/:uuid')
  async getForEditingByUUID(
    @Param('uuid') uuid: string,
    @Req() req: Request,
  ): Promise<IForEditing> {
    return this.listingService.getForEditingByUUID(uuid, req.user as User);
  }

  @Throttle({ default: { limit: 10, ttl: 1000 } })
  @Delete(':uuid')
  @UseGuards(JwtGuard)
  async deleteByUUID(@Param('uuid') uuid: string, @Req() req: Request) {
    return this.listingService.deleteByUuid(uuid, req);
  }

  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @Patch(':uuid')
  @UseGuards(JwtGuard)
  @ApiBody({
    description: 'Update a listing',
    type: UpdateListingDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images', MAX_IMAGES))
  async patchListing(
    @Param('uuid') uuid: string,
    @Body() body: any,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request,
  ): Promise<{ uuid: string }> {
    const updateListingDto: UpdateListingDto = {
      listing: this.safeParse(body.listing),
      location: this.safeParse(body.location),
      images: files ? files.map((file) => ({ file })) : [],
      deletedImages: body.deletedImages
        ? this.safeParse(body.deletedImages)
        : [],
      amenities: body.amenities ? this.safeParse(body.amenities) : [],
      deletedAmenities: body.deletedAmenities
        ? this.safeParse(body.deletedAmenities)
        : [],
      rooms: body.rooms ? this.safeParse(body.rooms) : [],
    };

    updateListingDto.listing.user = (req as any).user;
    return {
      uuid: await this.listingService.updateListingByUuid(
        uuid,
        updateListingDto,
      ),
    };
  }

  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @UseGuards(JwtGuard)
  @Post('/favourite/:uuid')
  async favourite(@Param('uuid') uuid: string, @Req() req: Request) {
    return this.listingService.favourite(uuid, req);
  }

  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @UseGuards(JwtGuard)
  @Delete('/favourite/:uuid')
  async deleteFavourite(@Param('uuid') uuid: string, @Req() req: Request) {
    return this.listingService.deleteFavourite(uuid, req);
  }

  private safeParse(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch {
      return {};
    }
  }
}
