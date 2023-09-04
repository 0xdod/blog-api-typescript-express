import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "../users/user.service";
import { UserRepository } from "../users/user.repository";
import { validateSignUpRequest } from "./middlewares";
import { PrismaClient } from "@prisma/client";

export default (prisma: PrismaClient) => {
  const router = Router();

  const userRepo = new UserRepository(prisma);
  const userService = new UserService(userRepo);
  const authService = new AuthService(userService);
  const authController = new AuthController(authService);

  router.post("/login", (req, res) => {
    authController.login(req, res);
  });
  router.post("/signup", validateSignUpRequest, (req, res) => {
    authController.signUp(req, res);
  });

  return router;
};
