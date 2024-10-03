import { Body, Controller, Get, Post, Route, Security, Tags } from "tsoa"
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

import { IRegisterPayload, ILoginPayload, IEmailVerifyPayload } from "../interfaces/user.interface";
import { User } from "../database/models/user.model";
import TokenService from "../services/token.service";
import EmailService from "../services/email.service";
import { HttpError } from "../errors/errors";
import StatusCode from "status-code-enum";
import UserService from "../services/user.service";

dotenv.config()

@Route('auth')
@Tags('Auth')
export class AuthenticationController extends Controller {
    @Post('register')
    public async register(
        @Body() requestBody : IRegisterPayload
    ): Promise<void> {
        const { firstName, lastName, email, password} = requestBody

        const existingUser = await User.findOne({where: {email}})

        if(existingUser) {
            throw new HttpError(StatusCode.ClientErrorConflict, 'User with this email already exists.')
        }
        
        const userService = new UserService()
        const newUser = await userService.createUser(firstName, lastName, email, password)

        await newUser.save()

        const tokenService = new TokenService()
        const token = await tokenService.generateToken(newUser, '30m')

        const emailService = new EmailService()
        await emailService.sendEmailVerification(newUser.email, token)

        this.setStatus(StatusCode.SuccessCreated)
    }

    @Post('login')
    public async login(
        @Body() requestBody: ILoginPayload
    ): Promise<void> {
        const {email, password, rememberMe} = requestBody

        const existingUser = await User.findOne({where: {email: email}})

        if(!existingUser) {
            throw new HttpError(StatusCode.ClientErrorUnauthorized, 'Incorrect email or password.')
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.passwordHashed)
        if(!isPasswordValid) {
            throw new HttpError(StatusCode.ClientErrorUnauthorized, 'Incorrect email or password.')
        }

        if(!existingUser.verified) {
            throw new HttpError(StatusCode.ClientErrorNotAcceptable, 'Email is not verified.')
        }

        const tokenService = new TokenService()
        const token = await tokenService.generateToken(existingUser, rememberMe ? '2d' : '1h')
        
        if (rememberMe) {
          this.setHeader('Set-Cookie', `jwt=${token}; HttpOnly; Max-Age=${1000 * 60 * 60 * 24 * 2}; Path=/`)
        } else {
          this.setHeader('Set-Cookie', `jwt=${token}; HttpOnly; Path=/`)
        }
        
        this.setStatus(StatusCode.SuccessNoContent)
    }

    @Post('logout')
    @Security('jwt')
    public async logout(): Promise<void> {
        this.setHeader('Set-Cookie', [`jwt=deleted; Max-Age=0; Path=/`])
        this.setStatus(StatusCode.SuccessNoContent)
    }

    @Post('verify-email')
    public async emailVerify(
        @Body() requestBody : IEmailVerifyPayload
    ): Promise<void> {
        const {token} = requestBody

        if(!token) {
            throw new HttpError(StatusCode.ClientErrorNotFound, 'Token not found')
        }

        const tokenService = new TokenService()
        const decoded = await tokenService.decodeToken(token)

        const existingUser = await User.findByPk(decoded.id)

        if(!existingUser) {
            throw new HttpError(StatusCode.ClientErrorNotFound, 'User not found')
        }

        if(existingUser.verified) {
            throw new HttpError(StatusCode.RedirectNotModified, 'User is already verified')
        }

        existingUser.verified = true
        await existingUser.save()

        this.setStatus(StatusCode.SuccessNoContent)
    }

    @Get('profile')
    @Security('jwt')
    public async profile(): Promise<void> {}
}