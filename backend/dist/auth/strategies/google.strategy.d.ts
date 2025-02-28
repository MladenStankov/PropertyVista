import { ConfigService } from '@nestjs/config';
import { VerifyCallback, Strategy } from 'passport-google-oauth20';
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor(configService: ConfigService);
    authorizationParams(): {
        [key: string]: string;
    };
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<void>;
}
export {};
