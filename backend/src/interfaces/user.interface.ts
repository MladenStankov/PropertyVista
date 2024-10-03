export interface IRegisterPayload { 
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface ILoginPayload {
    email: string,
    password: string,
    rememberMe: boolean
}

export interface IEmailVerifyPayload {
    token?: string
}