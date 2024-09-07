import express, {Request, Response} from "express"
import UserController from '../controllers/user'

const router = express.Router()

router.get('/users', async (req : Request, res : Response) => {
    const controller = new UserController()
    const response = await controller.getUsers()
    return res.send(response)
})

export default router