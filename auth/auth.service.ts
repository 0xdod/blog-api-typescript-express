import { UserService } from "../users/user.service";
import { HttpError } from "../utils/errors/base-http.error";
import { comparePassword, hashPassword } from "../utils/strings/hash";
import jwt from "jsonwebtoken";
import loadConfig from "../config";

const config = loadConfig();

export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(signUpDto: {
    password: string;
    username: string;
    email: string;
  }) {
    const { password, username, email } = signUpDto;
    if (await this.userService.findByUsername(username)) {
      throw new HttpError("Username already exists", 409);
    }
    if (await this.userService.findByEmail(email)) {
      throw new HttpError("Email already exists", 409);
    }

    const passwordHash = await hashPassword(password);

    return this.userService.create({
      username,
      email,
      password: passwordHash,
    });
  }

  async login(loginDto: { email: string; password: string }) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpError("Invalid Credentials", 401);
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new HttpError("Invalid Credentials", 401);
    }

    return {
      ...user,
      password: undefined,
      accessToken: this.generateToken({ username: user.username, id: user.id }),
    };
  }

  async authUser(userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    return {
      ...user,
      password: undefined,
    };
  }

  private generateToken(user: { username: string; id: string }): string {
    return jwt.sign({ id: user.id, sub: user.username }, config.jwtSecret, {
      expiresIn: "1h",
    });
  }
}
