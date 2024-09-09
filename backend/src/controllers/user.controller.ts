import {Get, Post, Delete,  Route, Body, Patch, Path } from 'tsoa'
import User from '../database/models/user.model'
import { ICreateBodyRequest, ICreateResponse, IDeleteResponse, IGetAllResponse, IPatchBodyRequest, IPatchResponse } from '../interfaces/user.interface'

@Route('/users')
export default class UserController {
    @Get('/')
    public async getAll(): Promise<IGetAllResponse> {
        try {
            const users = await User.findAll()

            return {
                response: {
                    statusCode: 200,
                    message: 'Successfull fetch (users:getAll)'
                },
                users: users
            }

        } catch (error) {
            return {
                response: {
                    statusCode: 500,
                    message: `Internal server error (users:getAll): ${error}`
                },
                users: undefined
            }
        }
    }
    @Post("/")
    public async create(@Body() body: ICreateBodyRequest): Promise<ICreateResponse> {
        try{
            const {firstName, lastName, email, password} = body

            const newUser = await User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                passwordHashed: password,
                profileImage: ''
            })
            return {
                response: {
                    statusCode: 200,
                    message: 'Successfull create (user:create)' 
                },
                user: newUser
            }
        } catch (error) {
            return {
                response: {
                    statusCode: 500,
                    message: `Internal server error (users:create): ${error}`
                },
                user: undefined
            }
        }
    }
    @Patch("/{userId}")
    public async patch(
        @Path() userId: number,
        @Body() body : IPatchBodyRequest
    ) : Promise<IPatchResponse> {
        try {
            const user = await User.findByPk(userId)

            if(user === null) {
                return {
                    response: {
                        statusCode: 404,
                        message: `Unable to find a user with ID: ${userId}`
                    }, 
                    user: undefined
                }
            }
            body.elements.forEach(element => {
                if(element.field in user.get()) {
                    (user as any)[element.field] = element.value
                }
            })

            await user.save()

            return {
                response: {
                    statusCode: 200,
                    message: 'Successfull patch (user:patch)'
                },
                user: user
            }

        } catch (error) {
            return {
                response: {
                    statusCode: 500,
                    message: `Internal server error (users:patch): ${error}`
                },
                user: undefined
            }
        }
    }
    @Delete("/{userId}")
    public async delete(
        @Path() userId: number
    ): Promise<IDeleteResponse> {
        try {
            const user = await User.findByPk(userId)
            
            if(user === null) {
                return {
                    response: {
                        statusCode: 404,
                        message: `Unable to find a user with ID: ${userId}`
                    }
                }
            }

            await user.destroy()
            return {
                response: {
                    statusCode: 200,
                    message: 'Successfull delete (user:delete)'
                }
            }
        } catch (error) {
            return {
                response: {
                    statusCode: 500,
                    message: `Internal server error (user:delete): ${error}`
                }
            }
        }
    }
}