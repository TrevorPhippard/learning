import { PostRepository } from '../../domain/ports/post-repository.port';
import { Post } from '../../domain/entities/post.entity';
import { PostId } from '../../domain/value-objects/post-id.vo';
import { UserId } from '../../domain/value-objects/user-id.vo';
import { db } from '../drizzle/db';
import { posts, post_comments, post_reactions } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

export class DrizzlePostRepository implements PostRepository {
  async save(post: Post): Promise<void> {
    // Upsert post
    await db
      .insert(posts)
      .values({
        id: post.id.toString(),
        author_id: post.authorId.toString(),
        content: post.content,
        created_at: post.createdAt,
        updated_at: post.updatedAt
      })
      .onConflictDoUpdate({
        target: posts.id,
        set: {
          content: post.content,
          updated_at: new Date()
        }
      });

    // Replace reactions
    await db.delete(post_reactions).where(eq(post_reactions.post_id, post.id.toString()));

    if (post.reactions.length) {
      const reactions = post.reactions.map(r => ({
        id: `${r.userId.toString()}_${post.id.toString()}`,
        post_id: post.id.toString(),
        user_id: r.userId.toString(),
        type: r.type
      }));
      await db.insert(post_reactions).values(reactions); // FIXED
    }

    // Replace comments
    await db.delete(post_comments).where(eq(post_comments.post_id, post.id.toString()));

    if (post.comments.length) {
      const comments = post.comments.map(c => ({
        id: c.id.toString(), // FIXED
        post_id: post.id.toString(),
        author_id: c.userId.toString(),
        content: c.content,
        created_at: c.createdAt
      }));
      await db.insert(post_comments).values(comments); // FIXED
    }
  }

  private async mapRow(row: any): Promise<Post> {


    const post = new Post(
      PostId.of(row.id),
      UserId.of(row.author_id),
      row.content,
      row.created_at,
      row.updated_at
    );

    // Load reactions
    const reactionRows = await db
      .select()
      .from(post_reactions)
      .where(eq(post_reactions.post_id, row.id));

    for (const r of reactionRows) {
      post.addReaction(UserId.of(r.user_id), r.type);
    }

    // Load comments
    const commentRows = await db
      .select()
      .from(post_comments)
      .where(eq(post_comments.post_id, row.id));

    for (const c of commentRows) {
      post.addComment(c.id, UserId.of(c.author_id), c.content);
    }

    return post;
  }

  async findById(id: PostId): Promise<Post | null> {
    const rows = await db
      .select()
      .from(posts)
      .where(eq(posts.id, id.toString()))
      .limit(1);

    if (!rows.length) return null;

    return this.mapRow(rows[0]);
  }

  async findByAuthorId(authorId: UserId, limit = 20): Promise<Post[]> {
    const rows = await db
      .select()
      .from(posts)
      .where(eq(posts.author_id, authorId.toString()))
      .limit(limit);

    const results: Post[] = [];

    for (const r of rows) {
      results.push(await this.mapRow(r));
    }

    return results;
  }
}
