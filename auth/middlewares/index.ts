import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export function validateSignUpRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const signUpSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    email: Joi.string().email().required(),
  });

  const { error } = signUpSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
}

export function validateLogInRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const loginSchema = Joi.object({
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    email: Joi.string().email().required(),
  });
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
}
