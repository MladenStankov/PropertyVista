import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AwsService } from '../aws/aws.service';
import { ListingImagesService } from '../listings/services/listing-images.service';

@Injectable()
export class AwsCleanupService {
  constructor(
    private awsService: AwsService,
    private listingsImageService: ListingImagesService,
  ) {}

  // @Cron(CronExpression.EVERY_2_HOURS)
  // async cleanUp() {
  //   const filesInS3 = await this.awsService.getAllFiles();
  //   const imagesInDB = await this.listingsImageService.getAllFileNames();

  //   const filesToDelete = filesInS3.filter(
  //     (file) => !imagesInDB.includes(file),
  //   );

  //   for (const file of filesToDelete) {
  //     await this.awsService.deleteFile(file);
  //   }
  // }
}
