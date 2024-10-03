import { Body, Controller, Put, Route, Tags } from "tsoa";
import { HttpError } from "../errors/errors";
import StatusCode from "status-code-enum";
import { User } from "../database/models/user.model";
import TokenService from "../services/token.service";
import { IEmailVerifyPayload } from "../interfaces/user.interface";

@Route('email')
@Tags('Email')
export class EmailController extends Controller {
    @Put('verify-email')
    public async verifyEmail(
        @Body() requestBody: IEmailVerifyPayload
    ): Promise<void> {
        const {token} = requestBody

        if(!token) {
            throw new HttpError(StatusCode.ClientErrorUnauthorized, 'Invalid token.')
        }

        const tokenService = new TokenService()
        const decoded = await tokenService.decodeToken(token)

        const existingUser = await User.findByPk(decoded.id)

        if(!existingUser) {
            throw new HttpError(StatusCode.ClientErrorNotFound, 'User not found.')
        }

        existingUser.verified = true
        console.log("🚀 ~ EmailController ~ true:", true)
        await existingUser.save()

        this.setStatus(StatusCode.SuccessOK)
    }

}