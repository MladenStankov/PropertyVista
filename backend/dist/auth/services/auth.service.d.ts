import { UsersService } from 'src/users/users.service';
import { AuthRefreshTokenService } from 'src/auth/services/auth-refresh-token.service';
import { Request, Response } from 'express';
import { User } from 'src/users/entity/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { ProfileInfo } from '../dto/profile-info.dto';
import { ProfileListings } from '../dto/profile-listings.dto';
export declare class AuthService {
    private userService;
    private authRefreshTokenService;
    constructor(userService: UsersService, authRefreshTokenService: AuthRefreshTokenService);
    register(registerPayload: CreateUserDto): Promise<User>;
    login(res: Response, req?: Request, user?: User): Promise<void>;
    validateUser(loginPayload: LoginDto): Promise<User>;
    refreshTokens(req: Request, res: Response): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(req: Request, res: Response): Promise<void>;
    googleLogin(req: Request, res: Response): Promise<void>;
    profileInfo(req: Request): Promise<ProfileInfo>;
    profileListings(req: Request): Promise<ProfileListings[]>;
    profileFavouriteListings(req: Request): Promise<ProfileListings[]>;
    changeName(name: string, user: User): Promise<void>;
    changeImage(file: Express.Multer.File, user: User): Promise<{
        newImage: string;
    }>;
}
