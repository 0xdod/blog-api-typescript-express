"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_router_1 = __importDefault(require("./auth/auth.router"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use("/v1/auth", (0, auth_router_1.default)(prisma));
exports.default = app;
