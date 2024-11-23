import {
  Body,
  Controller,
  Post,
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
}
