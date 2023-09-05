import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import bodyParser from "body-parser";
import setUpAuthRoutes from "./auth/auth.router";

const app = express();
const prisma = new PrismaClient();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/v1/auth", setUpAuthRoutes(app, prisma));

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

export default app;
