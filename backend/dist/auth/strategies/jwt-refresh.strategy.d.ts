import { Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
declare const JwtRefreshStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private userService;
    constructor(userService: UsersService);
    private static extractJwt;
    validate(payload: any): Promise<{
        attributes: import("../../users/entity/user.entity").User;
        refreshTokenExpiresAt: Date;
    }>;
}
export {};
