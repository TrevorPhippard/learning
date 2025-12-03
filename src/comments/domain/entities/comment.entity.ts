import { CommentId } from '../value-objects/comment-id.vo';
import { PostId } from '../value-objects/post-id.vo';
import { UserId } from '../value-objects/user-id.vo';

export class Comment {
  constructor(
    public readonly id: CommentId,
    public readonly postId: PostId,
    public readonly authorId: UserId,
    public content: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  updateContent(newContent: string) {
    this.content = newContent;
    this.updatedAt = new Date();
  }
}
