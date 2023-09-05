import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "../users/user.service";
import { UserRepository } from "../users/user.repository";
import { PrismaClient } from "@prisma/client";
import { Express } from "express";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { validateSchema } from "../utils/validator/validate";
import { loginSchema } from "./schema/login.schema";
import { signUpSchema } from "./schema/sign-up.schema";

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

  router.get(
    "/me",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      try {
        await authController.authUser(req as any, res);
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
};

// Configure Passport with JWT Strategy
function configurePassport(
  passport: passport.PassportStatic,
  userService: UserService
) {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwtPayload: { id: string }, done) => {
        try {
          const user = await userService.findOne(jwtPayload.id);
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        } catch (e) {
          return done(e, false);
        }
      }
    )
  );
}
