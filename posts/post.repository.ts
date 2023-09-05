import { PrismaClient } from "@prisma/client";
import { CreatePost } from "./interfaces/create-post.interface";

export class PostRepository {
  constructor(private readonly prisma: PrismaClient) {}

  create(createPostDto: CreatePost) {
    return this.prisma.post.create({
      data: createPostDto,
    });
  }
}
