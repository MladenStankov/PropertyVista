import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListingImage } from '../entity/listing-image.entity';
import { AwsService } from 'src/aws/aws.service';
import { ListingImageDto } from '../dto/listing-image.dto';
import { Listing } from '../entity/listing.entity';

@Injectable()
export class ListingImagesService {
  constructor(
    @InjectRepository(ListingImage)
    private listingImageRepository: Repository<ListingImage>,
    private awsService: AwsService,
  ) {}

  async create(createListingImageDto: ListingImageDto): Promise<ListingImage> {
    const imageUrl = await this.awsService.uploadFile(
      createListingImageDto.file,
    );
    const newListingImage = this.listingImageRepository.create({
      imageUrl,
      listing: createListingImageDto.listing,
    });

    return newListingImage.save();
  }

  async delete(image: string, listing: Listing): Promise<void> {
    const imageDB = await this.listingImageRepository.findOne({
      where: { imageUrl: image },
    });

    if (!imageDB) {
      return;
    }

    await this.awsService.deleteFile(image);
    await imageDB.remove();
  }

  async getAllByListingUuid(listingUuid: string): Promise<ListingImage[]> {
    return this.listingImageRepository.find({
      where: { listing: { uuid: listingUuid } },
    });
  }

  async getAllFileNames(): Promise<string[]> {
    return (await this.listingImageRepository.find()).map(
      (image) => image.imageUrl,
    );
  }
}
