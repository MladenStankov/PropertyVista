import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { HttpError } from '../errors/errors'
import { IJwtPayload } from '../interfaces/auth.interface'
import { IExpressRequest } from '../interfaces/express.interface'
import StatusCode from 'status-code-enum'
import { User } from '../database/models/user.model'
import TokenService from '../services/token.service'

dotenv.config()

export const expressAuthentication = async (request: IExpressRequest, securityName: string, scopes?: string[]): Promise<void> => {
    if(securityName == 'jwt') {
        const token = request.cookies.jwt

        if(!token) {    
            throw new HttpError(StatusCode.ClientErrorUnauthorized, 'No token provided in cookies.')
        }

        const tokenService = new TokenService()
        const decoded = await tokenService.decodeToken(token)

        const existingUser = await User.findByPk(decoded.id)

        if(!existingUser) {
            throw new HttpError(StatusCode.ClientErrorNotFound, 'User not found.')
        }

        if(!existingUser.verified) {
            throw new HttpError(StatusCode.ClientErrorUnauthorized, 'User is not verified.')
        }

        if(existingUser.passwordHashed != decoded.passwordHashed) {
            throw new HttpError(StatusCode.ClientErrorLoginTimeOut, 'Session Expired.')
        }

        if(scopes?.includes('Premium')) {
            // ....
        }

        request.userId = decoded.id
    } else {
       throw new Error('Authentication failed.')
    }
}
