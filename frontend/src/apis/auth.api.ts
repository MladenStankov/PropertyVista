import { ILoginPayload, IRegisterPayload } from "../interfaces/auth.interface";
import { IResponse } from "../interfaces/response.interface";
import { API_ENDPOINT } from "../main";

const AUTH_ENDPOINT = 'auth/'

export const register = async (payload : IRegisterPayload): Promise<IResponse> => {
    const response = await fetch(API_ENDPOINT + AUTH_ENDPOINT + 'register', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }) as IResponse

    return response
}

export const login = async (payload : ILoginPayload): Promise<IResponse> => {
    const response = await fetch(API_ENDPOINT + AUTH_ENDPOINT + 'login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }) as IResponse

    return response
}

