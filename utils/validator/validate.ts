import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export function validateSchema<T extends Record<string, any>>(
  schema: Joi.ObjectSchema<T>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  };
}
