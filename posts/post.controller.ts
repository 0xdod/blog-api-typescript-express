import { NextFunction, Request, Response } from "express";
import { PostService } from "./post.service";

export class PostController {
  constructor(private readonly postService: PostService) {}

  async create(req: Request, res: Response) {
    const post = await this.postService.create(req.user?.id!, req.body);
    res.json(post);
  }
}
