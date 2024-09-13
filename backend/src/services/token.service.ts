import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { AbstractUser, User } from '../database/models/user.model'
import { IJwtPayload } from '../interfaces/auth.interface'

dotenv.config()

export default class TokenService {
    static async generateToken(user: AbstractUser<any>, duration: string) {
        const role = user instanceof User ? 'user' : 'broker'
        
        const payload : IJwtPayload = {
            id: user.id,
            role: role,
            verified: user.verified
        }

        const AUTHENTICATION_SECRET_KEY = String(process.env.AUTHENTICATION_SECRET_KEY)
        const token = jwt.sign(payload, AUTHENTICATION_SECRET_KEY, {expiresIn: duration})

        return token
    }
}