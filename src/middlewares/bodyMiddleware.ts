import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";

const validateBody = (schema: ObjectSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(422).json({
        error: error.details.map(({ message }) => message),
      });
    }
  
    return next();
  };
  
  export { validateBody };