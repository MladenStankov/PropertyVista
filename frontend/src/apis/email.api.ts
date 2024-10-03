import { IEmailVerifyPayload } from "../interfaces/auth.interface";
import { IResponse } from "../interfaces/response.interface";
import { API_ENDPOINT } from "../main";

const EMAIL_ENDPOINT = 'email/'

export const emailVerify = async (payload : IEmailVerifyPayload): Promise<IResponse> => {
    const response = await fetch(API_ENDPOINT + EMAIL_ENDPOINT + 'verify-email', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }) as IResponse

    return response
}