import { NextFunction, Request, Response } from "express";

import { Error } from "../interfaces/errorInterface";

const errorHandlerMiddleware = async (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    if (error.code === "BadRequest") {
      return res.status(400).send(error.message);
    }
    if (error.code === "NotFound") {
      return res.status(404).send(error.message);
    }
    return res.sendStatus(500);
}

export { errorHandlerMiddleware }