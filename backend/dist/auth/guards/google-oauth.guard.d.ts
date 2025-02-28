import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
declare const GoogleOAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GoogleOAuthGuard extends GoogleOAuthGuard_base {
    constructor();
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
export {};
