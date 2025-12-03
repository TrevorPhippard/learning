import { Comment } from "../entities/comment.entity";
import { CommentId } from "../value-objects/comment-id.vo";
import { PostId } from "../value-objects/post-id.vo";
import { UserId } from "../value-objects/user-id.vo";

export interface CommentRepository {
  save(comment: Comment): Promise<void>;
  findById(id: CommentId): Promise<Comment | null>;
  findByPostId(postId: PostId, limit?: number): Promise<Comment[]>;
  findByAuthorId(authorId: UserId, limit?: number): Promise<Comment[]>;
}

export const COMMENT_REPOSITORY = Symbol("COMMENT_REPOSITORY");
