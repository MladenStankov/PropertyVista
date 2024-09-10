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

export interface ICreateBodyRequest {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface IPatchElement {
    field: string,
    value: any
}

export interface IPatchBodyRequest {
    elements: IPatchElement[]
}