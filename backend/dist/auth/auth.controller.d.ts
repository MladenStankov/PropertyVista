import { AuthService } from './services/auth.service';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { EmailSendingService } from 'src/email-sending/email-sending.service';
import { ConfigService } from '@nestjs/config';
import { ChangeNameDto } from './dto/change-name.dto';
export declare class AuthController {
    private authService;
    private emailSendingService;
    private configService;
    constructor(authService: AuthService, emailSendingService: EmailSendingService, configService: ConfigService);
    register(registerPayload: CreateUserDto): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    profile(req: Request): Promise<{
        id: number;
        fullName: string;
        email: string;
        imageUrl: string;
    }>;
    refreshTokens(req: Request, res: Response): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(req: Request, res: Response): Promise<void>;
    googleAuth(): Promise<void>;
    googleAuthCallBack(req: Request, res: Response): Promise<void>;
    profileInfo(req: Request): Promise<import("./dto/profile-info.dto").ProfileInfo>;
    profileListings(req: Request): Promise<import("./dto/profile-listings.dto").ProfileListings[]>;
    profileFavouriteListings(req: Request): Promise<import("./dto/profile-listings.dto").ProfileListings[]>;
    changeName(changeNameDto: ChangeNameDto, req: Request): Promise<void>;
    changeImage(file: Express.Multer.File, req: Request): Promise<{
        newImage: string;
    }>;
}
