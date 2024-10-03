import { hash } from 'bcrypt'
import { User } from '../database/models/user.model'

export default class UserService {
    async createUser(firstName: string, lastName: string, email: string, password: string) : Promise<User> {
        const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS)
        const passwordHashed = await hash(password, BCRYPT_SALT_ROUNDS)

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            passwordHashed
        })

        return newUser
    }
}