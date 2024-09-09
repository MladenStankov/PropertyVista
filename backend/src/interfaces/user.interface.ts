import User from "../database/models/user.model";
import IResponse from "./response.interface";

export interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    passwordHashed: string,
    profileImage: string,
    role: string
}

export interface IGetAllResponse {
    response: IResponse
    users: IUser[] | undefined
}

export interface ICreateBodyRequest {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface ICreateResponse {
    response: IResponse,
    user: IUser | undefined
}

export interface IPatchElement {
    field: string,
    value: any
}

export interface IPatchBodyRequest {
    elements: IPatchElement[]
}

export interface IPatchResponse {
    response: IResponse,
    user: IUser | undefined
}

export interface IDeleteResponse {
    response : IResponse
}