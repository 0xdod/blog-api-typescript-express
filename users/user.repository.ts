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

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  create(createUser: CreateUser) {
    return this.prisma.user.create({
      data: createUser,
    });
  }

  findOne(params: any) {
    return this.prisma.user.findFirst({
      where: params,
    });
  }
}
