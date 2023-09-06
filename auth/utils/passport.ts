import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import { UserService } from "../../users/user.service";

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

export default passport;
