import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(req: Request, res: Response) {}

  async signUp(req: Request, res: Response) {
    const result = await this.authService.signUp(req.body);
    res.json(result);
  }
}
