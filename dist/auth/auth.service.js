"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    signUp(signUpDto) {
        return __awaiter(this, void 0, void 0, function* () {
            // validation: check user (email, username) does not exist
            // hash password
            // create user
            return this.userService.create(signUpDto);
        });
    }
    validateUser(username, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            // const user = await this.userService.findOne(username);
            // if (user && user.password === pass) {
            //   const { password, ...result } = user;
            //   return result;
            // }
            // return null;
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            // const payload = { username: user.username, sub: user.userId };
            // return {
            //   access_token: this.jwtService.sign(payload),
            // };
        });
    }
}
exports.AuthService = AuthService;
