import { Request, Response, NextFunction } from "express";
import { signUpSchema } from "../validators";

export function validateSignUpRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = signUpSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
}
