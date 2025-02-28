import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
export declare class JwtWebsocketMiddleware {
    private jwtService;
    private configService;
    private userService;
    constructor(jwtService: JwtService, configService: ConfigService, userService: UsersService);
    use(socket: Socket, next: (err?: Error) => void): Promise<void>;
}
