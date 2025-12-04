import { Inject, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import {
  PostRepository,
  POST_REPOSITORY,
} from "../../domain/ports/post-repository.port";
import { PostId } from "../../domain/value-objects/post-id.vo";
import { UserId } from "../../domain/value-objects/user-id.vo";
import { Post } from "../../domain/entities/post.entity";
import { CreatePostDto } from "../dtos/create-post.dto";

@Injectable()
export class PostService {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly repo: PostRepository
  ) {}

  async create(dto: CreatePostDto) {
    const post = new Post(
      PostId.of(uuidv4()),
      UserId.of(dto.authorId),
      dto.content
    );
    await this.repo.save(post);
    return post;
  }

  async getById(id: string) {
    return this.repo.findById(PostId.of(id));
  }

  async addReaction(postId: string, userId: string, type: string) {
    const post = await this.repo.findById(PostId.of(postId));
    if (!post) throw new Error("Post not found");
    post.addReaction(UserId.of(userId), type);
    await this.repo.save(post);
  }

  async addComment(
    postId: string,
    commentId: string,
    userId: string,
    content: string
  ) {
    const post = await this.repo.findById(PostId.of(postId));
    if (!post) throw new Error("Post not found");
    post.addComment(commentId, UserId.of(userId), content);
    await this.repo.save(post);
  }

  async findByAuthor(authorId: string, limit = 20) {
    return this.repo.findByAuthorId(UserId.of(authorId), limit);
  }
}
