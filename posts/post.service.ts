import { slugify } from "../utils/strings/slugify";
import { CreatePost } from "./interfaces/create-post.interface";
import { EditPost } from "./interfaces/edit-post.interface";
import { PostRepository } from "./post.repository";

export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(userId: string, createPostDto: CreatePost) {
    const { title, content, published } = createPostDto;
    const createdPost = await this.postRepository.create({
      title,
      content,
      published,
      slug: slugify(title),
      authorId: userId,
    });
    return createdPost;
  }

  async edit(userId: string, editPostDto: EditPost) {}
}
