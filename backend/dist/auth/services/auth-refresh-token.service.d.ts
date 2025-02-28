import { JwtService } from '@nestjs/jwt';
import { AuthRefreshToken } from '../entity/auth-refresh-token.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entity/user.entity';
export declare class AuthRefreshTokenService {
    private jwtService;
    private configService;
    private authRefreshTokenRepository;
    constructor(jwtService: JwtService, configService: ConfigService, authRefreshTokenRepository: Repository<AuthRefreshToken>);
    private isRefreshTokenBlackListed;
    blacklistRefreshToken(refreshToken: string, expiresAt: Date, userId: number): Promise<void>;
    generateRefreshToken(user: User, currentRefreshToken?: string, currentRefreshTokenExpiresAt?: Date): Promise<string>;
    generateTokenPair(user: User, currentRefreshToken?: string, currentRefreshTokenExpiresAt?: Date): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    deleteExpiredRefreshTokens(): Promise<void>;
}
