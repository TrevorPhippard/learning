import { PostId } from "../value-objects/post-id.vo";
import { UserId } from "../value-objects/user-id.vo";

export class Post {
  private _reactions: { userId: UserId; type: string }[] = [];
  private _comments: {
    id: string;
    userId: UserId;
    content: string;
    createdAt: Date;
  }[] = [];

  constructor(
    public readonly id: PostId,
    public readonly authorId: UserId,
    public content: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  get reactions() {
    return [...this._reactions];
  }
  get comments() {
    return [...this._comments];
  }

  updateContent(newContent: string) {
    this.content = newContent;
    this.touch();
  }

  addReaction(userId: UserId, type: string) {
    this._reactions.push({ userId, type });
    this.touch();
  }

  addComment(id: string, userId: UserId, content: string) {
    this._comments.push({ id, userId, content, createdAt: new Date() });
  }

  private touch() {
    this.updatedAt = new Date();
  }
}
