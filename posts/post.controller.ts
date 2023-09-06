import { Request, Response } from "express";
import { PostService } from "./post.service";
import { PostPageQuery } from "./dto/post-page-query.dto";

export class PostController {
  constructor(private readonly postService: PostService) {}

  async create(req: Request, res: Response) {
    const post = await this.postService.create(req.user?.id!, req.body);
    res.json(post);
  }

  async getAll(req: Request, res: Response) {
    const pageQuery = PostPageQuery.fromQuery(req.query);
    const posts = await this.postService.getAll(pageQuery);
    res.json(posts);
  }

  async getOne(req: Request, res: Response) {
    const post = await this.postService.getOne(req.params.slugOrId);
    res.json(post);
  }

  async edit(req: Request, res: Response) {
    const post = await this.postService.edit(
      req.user?.id!,
      req.params.slugOrId,
      req.body
    );
    res.json(post);
  }

  async delete(req: Request, res: Response) {
    const post = await this.postService.delete(
      req.user?.id!,
      req.params.slugOrId
    );
    res.json(post);
  }
}
