import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";
import { HttpError } from "../errors/errors";
import StatusCode from "status-code-enum";

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    if (err instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(StatusCode.ClientErrorUnprocessableEntity).json({
        message: "Validation Failed",
        details: err?.fields,
      })
    }

    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({
        message: err.message
      })
    }

    if (err instanceof Error) {
      return res.status(StatusCode.ServerErrorInternal).json({
        message: "Internal Server Error: " + err.message,
      })
    }
  
    next()
}

export function notFoundHandler(req: Request, res: Response) {
    res.status(404).send({
      message: "Not Found",
    })
  }