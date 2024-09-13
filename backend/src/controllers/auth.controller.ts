import { Body, Controller, Get, Path, Post, Query, Res, Route, Security, Tags, TsoaResponse } from "tsoa"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { IRegisterPayload, ILoginPayload, IEmailVerifyPayload } from "../interfaces/user.interface";
import { User, Broker } from "../database/models/user.model";
import TokenService from "../services/token.service";
import EmailService from "../services/email.service";
import { HttpError } from "../errors/errors";
import { IJwtPayload } from "../interfaces/auth.interface";

dotenv.config()

@Route('auth')
@Tags('Auth')
export class AuthenticationController extends Controller {
    @Post('register')
    public async register(
        @Body() requestBody : IRegisterPayload
    ): Promise<void> {
        const {userType, firstName, lastName, email, password, brokerPayload} = requestBody

        const existingUser = await Promise.all([
            User.findOne({ where: { email } }), 
            Broker.findOne({ where: { email } })
          ]);

        if(!existingUser.every(value => value === null)) {
            throw new HttpError(409, 'User with this email already exists.')
        }

        const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS)
        const passwordHashed = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)

        const newUser = (userType == 'user') ? (
            await User.create({
                firstName,
                lastName,
                email,
                passwordHashed
            })
        ) : (
            await Broker.create({
                firstName,
                lastName,
                email,
                passwordHashed,
                countryOfOrigin: brokerPayload?.countryOfOrigin ?? '',
                agencyName: brokerPayload?.agencyName ?? '',
                phoneNumber: brokerPayload?.phoneNumber ?? ''
            })
        )

        await newUser.save()

        const token = await TokenService.generateToken(newUser, '1h')
        await EmailService.sendVerifyEmail(newUser.email, token)

        this.setStatus(201)
        return
    }

    @Post('login')
    public async login(
        @Body() requestBody: ILoginPayload
    ): Promise<void> {
        const {email, password, rememberMe} = requestBody

        const existingUser = await Promise.all([
            User.findOne({ where: { email } }), 
            Broker.findOne({ where: { email } })
          ]);

        if(existingUser.every(value => value === null)) {
            throw new HttpError(401, 'Incorrect email or password.')
        }

        const user = existingUser.find(obj => obj !== null)

        if(!user) {
            throw new Error()
        } 

        const isPasswordValid = await bcrypt.compare(password, user.passwordHashed)
        if(!isPasswordValid) {
            throw new HttpError(401, 'Incorrect email or password.')
        }

        if(!user.verified) {
            throw new HttpError(406, 'Email is not verified.')
        }

        const duration = rememberMe ? '2d' : '1h';
        const token = await TokenService.generateToken(user, duration);
        
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
    public async logout(): Promise<void> {
        this.setHeader('Set-Cookie', [`jwt=deleted; Max-Age=0`])
    }

    @Post('verify-email')
    public async emailVerify(
        @Body() requestBody : IEmailVerifyPayload
    ): Promise<void> {
        const {token} = requestBody

        if(!token) {
            throw new HttpError(404, 'Token not found')
        }

        const AUTHENTICATION_SECRET_KEY = String(process.env.AUTHENTICATION_SECRET_KEY)
        const decoded = jwt.verify(token, AUTHENTICATION_SECRET_KEY) as IJwtPayload

        const existingUser = await Promise.all([
            User.findByPk(decoded.id), 
            Broker.findByPk(decoded.id)
          ]);

        if(!existingUser) {
            throw new HttpError(404, 'User not found')
        }

        const user = existingUser.find(obj => obj !== null)

        if(!user) {
            throw new Error()
        }

        if(user.verified) {
            throw new HttpError(304, 'User is already verified')
        }

        user.verified = true
        await user.save()

        this.setStatus(200)
    }

    @Get('profile')
    @Security('jwt')
    public async profile(): Promise<void> {
    }
}