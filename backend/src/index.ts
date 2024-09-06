import express, {Express} from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app : Express = express()
const PORT : number = Number(process.env.PORT) || 3000

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}...`)
})