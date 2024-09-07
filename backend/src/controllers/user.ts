import {Get, Post, Route } from 'tsoa'

interface Response {
    user: string
} 

@Route('users')
export default class UserController {
    @Get('/')
    public async getUsers(): Promise<Response> {
        return {
            user: 'a'
        }
    }
}