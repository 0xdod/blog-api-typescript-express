import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export function validateSchema<T extends Record<string, any>>(
  schema: Joi.ObjectSchema<T>,
  source: "body" | "query" | "params" = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[source]);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    req[source] = value;
    next();
  };
}
