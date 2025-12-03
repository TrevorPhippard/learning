import { CommentRepository } from '../../domain/ports/comment-repository.port';
import { Comment } from '../../domain/entities/comment.entity';
import { CommentId } from '../../domain/value-objects/comment-id.vo';
import { PostId } from '../../domain/value-objects/post-id.vo';
import { UserId } from '../../domain/value-objects/user-id.vo';
import { db } from '../drizzle/db';
import { comments } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

export class DrizzleCommentRepository implements CommentRepository {
  async save(comment: Comment): Promise<void> {
    await db.insert(comments).values({
      id: comment.id.toString(),
      post_id: comment.postId.toString(),
      author_id: comment.authorId.toString(),
      content: comment.content,
      created_at: comment.createdAt,
      updated_at: comment.updatedAt
    }).onConflictDoUpdate({
      target: comments.id,
      set: { content: comment.content, updated_at: new Date() }
    });
  }

  private mapRow(row: any): Comment {
    const { Comment } = require('../../domain/entities/comment.entity');
    const { CommentId } = require('../../domain/value-objects/comment-id.vo');
    const { PostId } = require('../../domain/value-objects/post-id.vo');
    const { UserId } = require('../../domain/value-objects/user-id.vo');

    return new Comment(CommentId.of(row.id), PostId.of(row.post_id), UserId.of(row.author_id), row.content, row.created_at, row.updated_at);
  }

  async findById(id: CommentId): Promise<Comment | null> {
    const row = await db.select().from(comments).where(eq(comments.id, id.toString()));
    if (!row) return null;
    return this.mapRow(row);
  }

  async findByPostId(postId: PostId, limit = 20): Promise<Comment[]> {
    const rows = await db.select().from(comments).where(eq(comments.post_id, postId.toString())).limit(limit);
    return rows.map(this.mapRow);
  }

  async findByAuthorId(authorId: UserId, limit = 20): Promise<Comment[]> {
    const rows = await db.select().from(comments).where(eq(comments.author_id, authorId.toString())).limit(limit);
    return rows.map(this.mapRow);
  }
}
