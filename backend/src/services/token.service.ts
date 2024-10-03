import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { IJwtPayload } from '../interfaces/auth.interface'
import { User } from '../database/models/user.model'

dotenv.config()

export default class TokenService {
    async generateToken(user: User, duration: string) : Promise<string> {
        const payload : IJwtPayload = {
            id: user.id,
            passwordHashed: user.passwordHashed
        }

        const AUTHENTICATION_SECRET_KEY = String(process.env.AUTHENTICATION_SECRET_KEY)
        const token = jwt.sign(payload, AUTHENTICATION_SECRET_KEY, {expiresIn: duration})

        return token
    }

    async decodeToken(token: string) : Promise<IJwtPayload> {
        const AUTHENTICATION_SECRET_KEY = String(process.env.AUTHENTICATION_SECRET_KEY)
        const decoded = jwt.verify(token, AUTHENTICATION_SECRET_KEY) as IJwtPayload

        return decoded
    }
}