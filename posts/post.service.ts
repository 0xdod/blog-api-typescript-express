import { HttpError } from "../utils/errors/base-http.error";
import { Page, PageQueryWithSearch } from "../utils/page/page-query";
import { slugify } from "../utils/strings/slugify";
import { PostPageQuery } from "./dto/post-page-query.dto";
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

  async getAll(pageQuery: PostPageQuery) {
    const { skip, limit, searchTerm, published } = pageQuery;
    const where: Record<string, any> = {};
    if (searchTerm)
      where["OR"] = [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ];
    if (published) {
      where["published"] = published;
    }
    const posts = await this.postRepository.findAll({
      skip,
      take: limit,
      where,
    });
    const count = await this.postRepository.count({ where });
    return Page.from(posts, count, pageQuery);
  }

  async getOne(slugOrId: string) {
    // const post = await this.postRepository.findOne({ slug });
    const post = await this.postRepository.findOne({
      OR: [{ slug: slugOrId }, { id: slugOrId }],
    });
    if (!post) throw new HttpError("Post not found", 404);
    return post;
  }

  async edit(userId: string, slugOrId: string, editPostDto: EditPost) {
    const { title, content, published } = editPostDto;
    // const post = await this.postRepository.findOne({ id });
    const post = await this.postRepository.findOne({
      OR: [{ slug: slugOrId }, { id: slugOrId }],
    });
    if (!post) throw new HttpError("Post not found", 404);
    if (post.authorId !== userId) throw new HttpError("Forbidden", 403);
    if (title) {
      post.title = title;
      post.slug = !post.published ? slugify(title + "-" + userId) : post.slug;
    }
    if (content) post.content = content;
    if (published) post.published = published;

    const editedPost = await this.postRepository.update({ id: post.id }, post);
    return editedPost;
  }

  async delete(userId: string, slugOrId: string) {
    // const post = await this.postRepository.findOne({ id: postId });
    const post = await this.postRepository.findOne({
      OR: [{ slug: slugOrId }, { id: slugOrId }],
    });
    if (!post) throw new HttpError("Post not found", 404);
    if (post.authorId !== userId) throw new HttpError("Forbidden", 403);
    await this.postRepository.delete({ id: post.id });
    return post;
  }
}
