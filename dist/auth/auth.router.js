"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../users/user.service");
const user_repository_1 = require("../users/user.repository");
const middlewares_1 = require("./middlewares");
exports.default = (prisma) => {
    const router = (0, express_1.Router)();
    const userRepo = new user_repository_1.UserRepository(prisma);
    const userService = new user_service_1.UserService(userRepo);
    const authService = new auth_service_1.AuthService(userService);
    const authController = new auth_controller_1.AuthController(authService);
    router.post("/login", (req, res) => {
        authController.login(req, res);
    });
    router.post("/signup", middlewares_1.validateSignUpRequest, (req, res) => {
        authController.signUp(req, res);
    });
    return router;
};
