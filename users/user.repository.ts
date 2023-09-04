import { PrismaClient } from "@prisma/client";
import { CreateUser } from "./interfaces/create-user.interface";

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  create(createUser: CreateUser) {
    return this.prisma.user.create({
      data: createUser,
    });
  }
}
