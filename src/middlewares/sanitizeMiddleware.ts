import { stripHtml } from "string-strip-html";
import { NextFunction, Request, Response } from "express";

const sanitizeDatas = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.body) return next();

  Object.keys(req.body).forEach((key) => {
    if (typeof req.body[key] === "string") {
      req.body[key] = stripHtml(req.body[key]).result.trim();
    }
  });

  return next();
};

export { sanitizeDatas };