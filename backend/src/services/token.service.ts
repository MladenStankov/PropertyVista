import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import User from "../database/models/user.model"
import { IJwtPayload } from '../interfaces/auth.interface'

dotenv.config()

export default class TokenService {
    static async generateToken(user: User, duration: string) {
        const payload : IJwtPayload = {
            id: user.id,
            role: user.role,
            verified: user.verified
        }

        const AUTHENTICATION_SECRET_KEY = String(process.env.AUTHENTICATION_SECRET_KEY)
        const token = jwt.sign(payload, AUTHENTICATION_SECRET_KEY, {expiresIn: duration})

        return token
    }
}