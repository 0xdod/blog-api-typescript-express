import { PrismaClient } from "@prisma/client";
import { CreatePost } from "./interfaces/create-post.interface";

export class PostRepository {
  constructor(private readonly prisma: PrismaClient) {}

  create(createPostDto: CreatePost) {
    return this.prisma.post.create({
      data: createPostDto,
    });
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(params: any) {
    return this.prisma.post.findFirst({
      where: params,
    });
  }

  update(params: any, data: any) {
    return this.prisma.post.update({
      where: params,
      data,
    });
  }

  delete(params: any) {
    return this.prisma.post.delete({
      where: params,
    });
  }
}
