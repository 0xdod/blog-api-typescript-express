import { PrismaClient } from "@prisma/client";

interface CreateUser {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  email: string;
  firstname?: string;
  lastname?: string;
  username: string;
  password: string;
}

interface FindOneUser {
  id?: string;
  username?: string;
  email?: string;
}

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  create(createUser: CreateUser) {
    return this.prisma.user.create({
      data: createUser,
    });
  }

  findOne(params: FindOneUser) {
    return this.prisma.user.findFirst({
      where: params,
    });
  }
}
