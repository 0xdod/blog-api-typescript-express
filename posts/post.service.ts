import { HttpError } from "../utils/errors/base-http.error";
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
      slug: slugify(title + "-" + userId),
      authorId: userId,
    });
    return createdPost;
  }

  async getAll() {
    const posts = await this.postRepository.findAll();
    return posts;
  }

  async getOne(slug: string) {
    const post = await this.postRepository.findOne({ slug });
    if (!post) throw new HttpError("Post not found", 404);
    return post;
  }

  async edit(userId: string, editPostDto: EditPost) {
    const { id, title, content, published } = editPostDto;
    const post = await this.postRepository.findOne({ id });
    if (!post) throw new HttpError("Post not found", 404);
    if (post.authorId !== userId) throw new HttpError("Forbidden", 403);
    if (title) {
      post.title = title;
      post.slug = slugify(title + "-" + userId);
    }
    if (content) post.content = content;
    if (published) post.published = published;

    const editedPost = await this.postRepository.update({ id }, post);
    return editedPost;
  }

  async delete(userId: string, postId: string) {
    const post = await this.postRepository.findOne({ id: postId });
    if (!post) throw new HttpError("Post not found", 404);
    if (post.authorId !== userId) throw new HttpError("Forbidden", 403);
    await this.postRepository.delete({ id: postId });
    return post;
  }
}
