import express, {Application} from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import dotenv from 'dotenv'

import UserRouter from './routes/user.route'
import { databaseSync } from './database/database'

dotenv.config()

const app : Application = express()
const PORT : number = Number(process.env.PORT) || 3000

// Database connection
databaseSync()

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static("public"))

// Swagger setup
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
  );

app.use(UserRouter)

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}...`)
})