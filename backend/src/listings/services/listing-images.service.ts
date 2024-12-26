import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListingImage } from '../entity/listing-image.entity';
import { AwsService } from 'src/aws/aws.service';
import { CreateListingImageDto } from '../dto/create-listing-image.dto';

@Injectable()
export class ListingImagesService {
  constructor(
    @InjectRepository(ListingImage)
    private listingImageRepository: Repository<ListingImage>,
    private awsService: AwsService,
  ) {}

  async create(
    createListingImageDto: CreateListingImageDto,
  ): Promise<ListingImage> {
    const imageUrl = await this.awsService.uploadFile(
      createListingImageDto.file,
    );
    const newListingImage = this.listingImageRepository.create({
      imageUrl,
      listing: createListingImageDto.listing,
    });

    return newListingImage.save();
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
