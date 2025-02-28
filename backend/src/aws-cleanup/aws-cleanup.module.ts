import { Module } from '@nestjs/common';
import { AwsCleanupService } from './aws-cleanup.service';
import { AwsModule } from '../aws/aws.module';
import { ListingsModule } from '../listings/listings.module';

@Module({
  providers: [AwsCleanupService],
  imports: [AwsModule, ListingsModule],
})
export class AwsCleanupModule {}
