import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { VerifyCallback, Strategy } from 'passport-google-oauth20';
import * as crypto from 'node:crypto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
      prompt: 'consent',
    };
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { name, emails, photos } = profile;

    let fullName = '';

    if (name.givenName !== undefined && name.familyName !== undefined) {
      fullName = name.givenName + name.familyName;
    } else if (name.givenName !== undefined && name.familyName === undefined) {
      fullName = name.givenName;
    } else {
      fullName = crypto.randomBytes(10).toString('hex');
    }

    const user = {
      email: emails[0].value,
      fullName: fullName,
      imageUrl: photos[0].value,
    };
    done(null, user);
  }
}
