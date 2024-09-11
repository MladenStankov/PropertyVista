import { Body, Controller, Get, Post, Res, Route, Security, Tags, TsoaResponse } from "tsoa"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import { IUserLoginPayload, IUserRegisterPayload } from "../interfaces/user.interface";
import User from "../database/models/user.model";
import TokenService from "../services/token.service";
import EmailService from "../services/email.service";
import { HttpError } from "../errors/errors";

dotenv.config()

@Route('auth')
@Tags('Auth')
export class AuthenticationController extends Controller {
    @Post('register')
    public async register(
        @Body() requestBody : IUserRegisterPayload
    ) : Promise<void> {
        const {firstName, lastName, email, password} = requestBody

        const existingUser = await User.findOne({where: {email}})
        if(existingUser) {
            throw new HttpError(409, 'User with this email already exists.')
        }

        const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS)
        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            passwordHashed: hashedPassword,
            verified: true
        })
        await newUser.save()

        const token = await TokenService.generateToken(newUser, '1h')
        await EmailService.sendVerifyEmail(newUser.email, token)

        this.setStatus(201)
        return
    }

    @Post('login')
    public async login(
        @Body() requestBody: IUserLoginPayload,
        @Res() res: TsoaResponse<200, void>
    ) : Promise<void> {
        const {email, password, rememberMe} = requestBody

        const existingUser = await User.findOne({where: {email}})
        if(!existingUser) {
            throw new HttpError(401, 'Incorrect email or password.')
        }   

        const isPasswordValid = await bcrypt.compare(password, existingUser.passwordHashed)
        if(!isPasswordValid) {
            throw new HttpError(401, 'Incorrect email or password.')
        }

        if(!existingUser.verified) {
            throw new HttpError(406, 'Email is not verified.')
        }

        const duration = rememberMe ? '2d' : '1h';
        const token = await TokenService.generateToken(existingUser, duration);
        
        if (rememberMe) {
          this.setHeader('Set-Cookie', `jwt=${token}; HttpOnly; Max-Age=${1000 * 60 * 60 * 24 * 2}`);
        } else {
          this.setHeader('Set-Cookie', `jwt=${token}; HttpOnly`);
        }
        
        this.setStatus(200);
        return
    }

    @Post('logout')
    @Security('jwt')
    public async logout() : Promise<void> {
        this.setHeader('Set-Cookie', [`jwt=deleted; Max-Age=0`])
    }

    @Get('profile')
    @Security('jwt')
    public async profile() : Promise<void> {
    }
}