import { Body, Controller, Get, Post, Route, Tags } from "tsoa";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { IUserRegisterPayload, IUserResponse } from "../interfaces/user.interface";
import User from "../database/models/user.model";

dotenv.config()

@Route('auth')
@Tags('Auth')
export class AuthenticationController extends Controller {
    @Post('register')
    public async register(
        @Body() requestBody : IUserRegisterPayload
    ) : Promise<IUserResponse> {
        const {firstName, lastName, email, password} = requestBody

        const existingUser = await User.findOne({where: {email}})
        if(existingUser) {
            this.setStatus(409)
            throw new Error('User with this email already exists')
        }

        const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS)
        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            passwordHashed: hashedPassword
        })
        await newUser.save()

        return {
            firstName,
            lastName,
            email
        }
    }
}