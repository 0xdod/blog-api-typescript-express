import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import { UserService } from "../../users/user.service";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../utils/errors/base-http.error";

// Configure Passport with JWT Strategy
export function configurePassport(
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

export const authenticate = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate(
    "jwt",
    (err: any, user: any, info: any, status: any) => {
      if (err) {
        console.error(err.stack);
        return next(err);
      }
      if (!user) {
        return next(new HttpError("Unauthorized", 401));
      }
      req.user = user;
      next();
    }
  )(req, res, next);

export default passport;
