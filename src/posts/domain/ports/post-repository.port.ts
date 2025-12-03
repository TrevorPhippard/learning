import { Post } from "../entities/post.entity";
import { PostId } from "../value-objects/post-id.vo";
import { UserId } from "../value-objects/user-id.vo";

export interface PostRepository {
  save(post: Post): Promise<void>;
  findById(id: PostId): Promise<Post | null>;
  findByAuthorId(authorId: UserId, limit?: number): Promise<Post[]>;
}

export const POST_REPOSITORY = Symbol("POST_REPOSITORY");
