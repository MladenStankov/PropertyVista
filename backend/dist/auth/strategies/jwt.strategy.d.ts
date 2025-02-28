import { Strategy } from 'passport-jwt';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { IJwtTokenPayload } from '../dto/jwt-token.dto';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    constructor(userService: UsersService);
    private static extractJwt;
    validate(payload: IJwtTokenPayload): Promise<User | null>;
}
export {};
