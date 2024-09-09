import express, {Request, Response} from "express"
import UserController from '../controllers/user.controller'

const router = express.Router()

router.get('/users', async (req: Request, res: Response) => {
    const controller = new UserController()
    const response = await controller.getAll()
    return res.send(response)
})

router.post('/users', async (req: Request, res: Response) => {
    const controller = new UserController()
    const response = await controller.create(req.body)
    return res.send(response)
})

router.patch('/users/:userId', async (req: Request, res: Response) => {
    const userId : number = Number(req.params.userId)
    const controller = new UserController()
    const response = await controller.patch(userId, req.body)
    return res.send(response)
})

router.delete('/users/:userId', async (req: Request, res: Response) => {
    const userId : number = Number(req.params.userId)
    const controller = new UserController()
    const response = await controller.delete(userId)
    return res.send(response)
})

export default router