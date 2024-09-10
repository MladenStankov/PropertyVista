import express, {Application, Response, Request, NextFunction} from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import dotenv from 'dotenv'

import { databaseSync } from './database/database'
import cookieParser from 'cookie-parser'
import { ValidateError } from 'tsoa'
import { RegisterRoutes } from './routes/routes'

dotenv.config()

const app : Application = express()
const PORT : number = Number(process.env.PORT) || 3000

// Database connection
databaseSync()

// Server settings
app.use(cookieParser())
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

// Routes
RegisterRoutes(app)

// Error handling
app.use(function notFoundHandler(req: Request, res: Response) {
  res.status(404).send({
    message: "Not Found",
  });
});

app.use(function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    })
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error: " + err,
    })
  }

  next()
})

// Server listening
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}...`)
})