import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { HttpError } from '../errors/errors'
import { IJwtPayload } from '../interfaces/auth.interface'
import { IExpressRequest } from '../interfaces/express.interface'

dotenv.config()

export const expressAuthentication = async (request: IExpressRequest, securityName: string, requiredRoles?: string[]): Promise<void> => {
    if(securityName == 'jwt') {
        const token = request.cookies.jwt

        if(!token) {
            throw new HttpError(401, 'No token provided in cookies.')
        }

        const AUTHENTICATION_SECRET_KEY = String(process.env.AUTHENTICATION_SECRET_KEY)

        const decoded = jwt.verify(token, AUTHENTICATION_SECRET_KEY) as IJwtPayload

        if(requiredRoles?.length && !requiredRoles.includes(decoded.role)) {
            throw new HttpError(401, 'Unauthorized role.')
        }

        if(!decoded.verified) {
            throw new HttpError(401, 'User is not verified.')
        }
        request.userId = decoded.id
        return
    }
    return Promise.reject(new Error('Authentication failed.'))
}
