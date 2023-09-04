import express from "express";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import bodyParser from "body-parser";
import setUpAuthRoutes from "./auth/auth.router";

const app = express();
const prisma = new PrismaClient();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/v1/auth", setUpAuthRoutes(prisma));

export default app;
