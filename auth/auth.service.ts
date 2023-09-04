import { UserService } from "../users/user.service";
import { SignUpDto } from "./dto/sign-up.dto";

export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(signUpDto: SignUpDto) {
    // validation: check user (email, username) does not exist
    // hash password
    // create user
    return this.userService.create(signUpDto);
  }

  async validateUser(username: string, pass: string) {
    // const user = await this.userService.findOne(username);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    // return null;
  }

  async login() {
    // const payload = { username: user.username, sub: user.userId };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
  }
}
