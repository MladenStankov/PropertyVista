import { User } from 'src/users/entity/user.entity';
import { BaseEntity } from 'typeorm';
export declare class AuthRefreshToken extends BaseEntity {
    id: number;
    refreshToken: string;
    expiresAt: Date;
    userId: number;
    user: User;
}
