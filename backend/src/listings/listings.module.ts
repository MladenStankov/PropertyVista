import { Module } from '@nestjs/common';
import { ListingsService } from './services/listings.service';
import { ListingsController } from './listings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entity/listing.entity';
import { ListingImage } from './entity/listing-image.entity';
import { ListingLocation } from './entity/listing-location.entity';
import { ListingView } from './entity/listing-view.entity';
import { ListingRoom } from './entity/listing-room.entity';
import { ListingAmenity } from './entity/listing-amenity.entity';
import { ListingPriceHistory } from './entity/listing-price-history.entity';
import { AwsModule } from 'src/aws/aws.module';
import { ListingLocationsService } from './services/listing-locations.service';
import { ListingImagesService } from './services/listing-images.service';
import { ListingAmenitiesService } from './services/listing-amenities.service';
import { ListingRoomsService } from './services/listing-rooms.service';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ListingViewsService } from './services/listing-views.service';
import { ListingFavourite } from './entity/listing-favourite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Listing,
      ListingImage,
      ListingLocation,
      ListingView,
      ListingRoom,
      ListingAmenity,
      ListingPriceHistory,
      ListingFavourite,
    ]),
    AwsModule,
  ],
  providers: [
    ListingsService,
    ListingLocationsService,
    ListingImagesService,
    ListingAmenitiesService,
    ListingRoomsService,
    ListingViewsService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [ListingsController],
  exports: [ListingImagesService],
})
export class ListingsModule {}
