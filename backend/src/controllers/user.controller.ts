import {Get, Post, Delete,  Route, Body, Patch, Path, Controller, Tags } from 'tsoa'
import User from '../database/models/user.model'
import { ICreateBodyRequest, IPatchBodyRequest, IUser } from '../interfaces/user.interface'

@Route('users')
@Tags('Users')
export default class UserController extends Controller {
    @Get('/')
    public async get(): Promise<IUser[]> {
        try {
            const users = await User.findAll()

            this.setStatus(200)
            return users
        } catch (error) {
            this.setStatus(500)
            return []
        }
    }

    @Get('/{userId}')
    public async getById(@Path() userId: number): Promise<IUser | null> {
        try {
            const user = await User.findByPk(userId)

            if(user === null) {
                this.setStatus(404)
                return null
            }

            this.setStatus(200)
            return user
        } catch (error) {
            this.setStatus(500)
            return null
        }
    }
    @Post("/")
    public async create(@Body() body: ICreateBodyRequest): Promise<IUser | null> {
        try{
            const {firstName, lastName, email, password} = body

            const newUser = await User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                passwordHashed: password,
                profileImage: ''
            })
            
            this.setStatus(200)
            return newUser
        } catch (error) {
            this.setStatus(500)
            return null
        }
    }
    @Patch("/{userId}")
    public async patch(
        @Path() userId: number,
        @Body() body : IPatchBodyRequest
    ) : Promise<IUser | null> {
        try {
            const user = await User.findByPk(userId)

            if(user === null) {
                this.setStatus(404)
                return null
            }
            body.elements.forEach(element => {
                if(element.field in user.get()) {
                    (user as any)[element.field] = element.value
                }
            })

            await user.save()

            this.setStatus(200)
            return user

        } catch (error) {
            this.setStatus(500)
            return null
        }
    }
    @Delete("/{userId}")
    public async delete(
        @Path() userId: number
    ): Promise<null> {
        try {
            const user = await User.findByPk(userId)
            
            if(user === null) {
                this.setStatus(404)
                return null
            }

            await user.destroy()
            
            this.setStatus(200)
            return null
        } catch (error) {
            this.setStatus(500)
            return null
        }
    }
}
