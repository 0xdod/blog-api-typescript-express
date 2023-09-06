import { Express, Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "../users/user.service";
import { UserRepository } from "../users/user.repository";
import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../utils/validator/validate";
import { loginSchema } from "./schema/login.schema";
import { signUpSchema } from "./schema/sign-up.schema";
import passport, { authenticate, configurePassport } from "./utils/passport";

export default (app: Express, prisma: PrismaClient) => {
  const router = Router();

  const userRepo = new UserRepository(prisma);
  const userService = new UserService(userRepo);
  const authService = new AuthService(userService);
  const authController = new AuthController(authService);

  configurePassport(passport, userService);
  app.use(passport.initialize());

  router.post("/login", validateSchema(loginSchema), async (req, res, next) => {
    try {
      await authController.login(req, res);
    } catch (err) {
      next(err);
    }
  });

  router.post(
    "/signup",
    validateSchema(signUpSchema),
    async (req, res, next) => {
      try {
        await authController.signUp(req, res);
      } catch (err) {
        next(err);
      }
    }
  );

  router.get("/user", authenticate, async (req, res, next) => {
    try {
      await authController.authUser(req as any, res);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
