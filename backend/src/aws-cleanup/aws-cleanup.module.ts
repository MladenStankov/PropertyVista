import { Module } from '@nestjs/common';
import { AwsCleanupService } from './aws-cleanup.service';
import { AwsModule } from 'src/aws/aws.module';
import { ListingsModule } from 'src/listings/listings.module';

@Module({
  providers: [AwsCleanupService],
  imports: [AwsModule, ListingsModule],
})
export class AwsCleanupModule {}
