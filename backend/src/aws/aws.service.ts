import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
  private s3: S3Client;
  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const bucketName = this.configService.get('AWS_BUCKET_NAME');
    const key = `${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      await this.s3.send(command);
      return `https://${bucketName}.s3.amazonaws.com/${key}`;
    } catch (error) {
      console.error('Error uploading to S3', error);
      throw new InternalServerErrorException('Error uploading file');
    }
  }
  async getFileUrl(key: string): Promise<string> {
    const bucketName = this.configService.get('AWS_BUCKET_NAME');
    const command = new GetObjectCommand({ Bucket: bucketName, Key: key });

    try {
      await this.s3.send(command);
      return `https://${bucketName}.s3.amazonaws.com/${key}`;
    } catch (error) {
      console.error('Error getting file from S3', error);
      throw new InternalServerErrorException('Error getting file');
    }
  }
}
