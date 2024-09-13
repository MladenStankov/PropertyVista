export enum userTypes {
    USER = 'user',
    BROKER = 'broker'
}

export interface IBrokerPayload {
    countryOfOrigin: string,
    agencyName?: string,
    phoneNumber?: string
}

export interface IRegisterPayload { 
    userType: userTypes,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    brokerPayload?: IBrokerPayload
}

export interface ILoginPayload {
    email: string,
    password: string,
    rememberMe: boolean
}

export interface IEmailVerifyPayload {
    token?: string
}

export interface IResponse {
    status: number,
    message?: string,
    data?: unknown
}