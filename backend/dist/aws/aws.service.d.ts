import { ConfigService } from '@nestjs/config';
export declare class AwsService {
    private configService;
    private s3;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File): Promise<string>;
    getFileUrl(key: string): Promise<string>;
    deleteFile(key: string): Promise<void>;
    getAllFiles(): Promise<string[]>;
}
