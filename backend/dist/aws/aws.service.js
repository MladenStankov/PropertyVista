"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AwsService = class AwsService {
    constructor(configService) {
        this.configService = configService;
        this.s3 = new client_s3_1.S3Client({
            region: this.configService.get('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
            },
        });
    }
    async uploadFile(file) {
        const bucketName = this.configService.get('AWS_BUCKET_NAME');
        const key = `${Date.now()}-${file.originalname}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        try {
            await this.s3.send(command);
            return `https://${bucketName}.s3.amazonaws.com/${key}`;
        }
        catch (error) {
            console.error('Error uploading to S3', error);
            throw new common_1.InternalServerErrorException('Error uploading file');
        }
    }
    async getFileUrl(key) {
        const bucketName = this.configService.get('AWS_BUCKET_NAME');
        const command = new client_s3_1.GetObjectCommand({ Bucket: bucketName, Key: key });
        try {
            await this.s3.send(command);
            return `https://${bucketName}.s3.amazonaws.com/${key}`;
        }
        catch (error) {
            console.error('Error getting file from S3', error);
            throw new common_1.InternalServerErrorException('Error getting file');
        }
    }
    async deleteFile(key) {
        const bucketName = this.configService.get('AWS_BUCKET_NAME');
        const command = new client_s3_1.DeleteObjectCommand({ Bucket: bucketName, Key: key });
        try {
            await this.s3.send(command);
        }
        catch (error) {
            console.error('Error deleting file from S3', error);
            throw new common_1.InternalServerErrorException('Error deleting file');
        }
    }
    async getAllFiles() {
        const bucketName = this.configService.get('AWS_BUCKET_NAME');
        const command = new client_s3_1.ListObjectsV2Command({ Bucket: bucketName });
        try {
            const response = await this.s3.send(command);
            return (response.Contents?.map((file) => file.Key).filter((file) => file !== 'default-profile-image.png') || []);
        }
        catch (error) {
            console.error('Error listing files in S3', error);
            throw new common_1.InternalServerErrorException('Error listing files in S3');
        }
    }
};
exports.AwsService = AwsService;
exports.AwsService = AwsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AwsService);
//# sourceMappingURL=aws.service.js.map