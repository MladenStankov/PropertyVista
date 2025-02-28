import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { ProfileInfo } from 'src/auth/dto/profile-info.dto';
import { ProfileListings } from 'src/auth/dto/profile-listings.dto';
import { AwsService } from 'src/aws/aws.service';
export declare class UsersService {
    private readonly usersRepository;
    private readonly configService;
    private readonly awsService;
    constructor(usersRepository: Repository<User>, configService: ConfigService, awsService: AwsService);
    create(createLocalUserDto: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | void>;
    findById(id: number): Promise<User | void>;
    findAll(): Promise<User[] | void>;
    getIdByEmail(email: string): Promise<number>;
    existsByEmail(email: string): Promise<boolean>;
    upadatePassword(email: string, password: string): Promise<void>;
    hasPassword(email: string): Promise<boolean>;
    deleteExpiredRefreshTokens(): Promise<void>;
    profileInfo(id: number): Promise<ProfileInfo>;
    profileListings(id: number): Promise<ProfileListings[]>;
    profileFavouriteListings(id: number): Promise<ProfileListings[]>;
    changeName(fullName: string, user: User): Promise<void>;
    changeImage(file: Express.Multer.File, user: User): Promise<{
        newImage: string;
    }>;
}
