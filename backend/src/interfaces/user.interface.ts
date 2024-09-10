export interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    passwordHashed: string,
    profileImage: string,
    role: string
}

export interface IUserRegisterPayload { 
    firstName: string,
    lastName: string,
    email: string,
    password: string
    rememberMe: boolean
}

export interface IUserResponse {
    firstName: string,
    lastName: string,
    email: string
}