import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { HttpError } from '../errors/errors'
import { IJwtPayload } from '../interfaces/auth.interface'
import { IExpressRequest } from '../interfaces/express.interface'
import StatusCode from 'status-code-enum'
import { Broker, User } from '../database/models/user.model'

dotenv.config()

export const expressAuthentication = async (request: IExpressRequest, securityName: string, requiredRoles?: string[]): Promise<void> => {
    if(securityName == 'jwt') {
        const token = request.cookies.jwt

        if(!token) {    
            throw new HttpError(StatusCode.ClientErrorUnauthorized, 'No token provided in cookies.')
        }

        const AUTHENTICATION_SECRET_KEY = String(process.env.AUTHENTICATION_SECRET_KEY)

        const decoded = jwt.verify(token, AUTHENTICATION_SECRET_KEY) as IJwtPayload

        if(requiredRoles?.length && !requiredRoles.includes(decoded.role)) {
            throw new HttpError(StatusCode.ClientErrorUnauthorized, 'Unauthorized role.')
        }

        if(!decoded.verified) {
            throw new HttpError(StatusCode.ClientErrorUnauthorized, 'User is not verified.')
        }

        const existingUser = await Promise.all([
            User.findByPk(decoded.id), 
            Broker.findByPk(decoded.id)
          ]);

        if(existingUser.every(value => value === null)) {
            throw new HttpError(StatusCode.ClientErrorNotFound, 'User not found')
        }

        request.userId = decoded.id
        return
    }
    return Promise.reject(new Error('Authentication failed.'))
}
