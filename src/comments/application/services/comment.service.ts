import { Inject, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import {
  CommentRepository,
  COMMENT_REPOSITORY,
} from "../../domain/ports/comment-repository.port";
import { CommentId } from "../../domain/value-objects/comment-id.vo";
import { PostId } from "../../domain/value-objects/post-id.vo";
import { UserId } from "../../domain/value-objects/user-id.vo";
import { Comment } from "../../domain/entities/comment.entity";
import { CreateCommentDto } from "../dtos/create-comment.dto";

@Injectable()
export class CommentService {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly repo: CommentRepository
  ) {}

  async create(dto: CreateCommentDto) {
    const comment = new Comment(
      CommentId.of(uuidv4()),
      PostId.of(dto.postId),
      UserId.of(dto.authorId),
      dto.content
    );
    await this.repo.save(comment);
    return comment;
  }

  async getById(id: string) {
    return this.repo.findById(CommentId.of(id));
  }

  async findByPost(postId: string, limit = 20) {
    return this.repo.findByPostId(PostId.of(postId), limit);
  }

  async findByAuthor(authorId: string, limit = 20) {
    return this.repo.findByAuthorId(UserId.of(authorId), limit);
  }

  async updateContent(id: string, content: string) {
    const comment = await this.repo.findById(CommentId.of(id));
    if (!comment) throw new Error("Comment not found");
    comment.updateContent(content);
    await this.repo.save(comment);
    return comment;
  }
}
