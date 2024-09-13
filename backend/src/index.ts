import express, {Application} from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import dotenv from 'dotenv'
import cors from 'cors'
import session from 'express-session'

import { databaseSync } from './database/database'
import cookieParser from 'cookie-parser'
import { RegisterRoutes } from './routes/routes'
import { errorHandler, notFoundHandler } from './middleware/error.middleware'
import helmet from 'helmet'

dotenv.config()

const app : Application = express()
const PORT : number = Number(process.env.PORT) || 3000

// Database connection
databaseSync()

// Server settings
app.use(cookieParser())
app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static("public"))
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

const SESSION_SECRET_KEY = String(process.env.SESSION_SECRET_KEY)

app.use(
  session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
)

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

// Routes
RegisterRoutes(app)

// Error handling
app.use(notFoundHandler)
app.use(errorHandler)

// Server listening
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}...`)
    console.log(`Swagger docs at http://localhost:${PORT}/docs...`)
})