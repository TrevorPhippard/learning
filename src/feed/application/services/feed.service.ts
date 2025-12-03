import { Injectable } from "@nestjs/common";
import Redis from "ioredis";
import axios from "axios";
import { UserId } from "../../domain/value-objects/user-id.vo";
import { FeedItem } from "../../domain/entities/feed-item.entity";

@Injectable()
export class FeedService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL || "");
  }

  private getCacheKey(userId: string) {
    return `feed:${userId}`;
  }

  async getFeed(userId: string, limit = 20): Promise<FeedItem[]> {
    const key = this.getCacheKey(userId);

    // Try cache first
    const cached = await this.redis.get(key);
    if (cached) return JSON.parse(cached);

    // Aggregate posts from Posts Service
    const postsRes = await axios.get(
      `${process.env.POSTS_SERVICE_URL}/posts/author/${userId}`
    );
    const posts = postsRes.data.map((p: any) => ({
      id: p.id,
      type: "post",
      authorId: p.authorId,
      content: p.content,
      createdAt: p.createdAt,
    }));

    // Aggregate comments from Comments Service
    const commentsRes = await axios.get(
      `${process.env.COMMENTS_SERVICE_URL}/comments/author/${userId}`
    );
    const comments = commentsRes.data.map((c: any) => ({
      id: c.id,
      type: "comment",
      authorId: c.authorId,
      content: c.content,
      createdAt: c.createdAt,
    }));

    const feed: FeedItem[] = [...posts, ...comments]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, limit);

    // Cache feed
    await this.redis.set(
      key,
      JSON.stringify(feed),
      "EX",
      Number(process.env.FEED_CACHE_TTL || 60)
    );

    return feed;
  }

  async invalidateFeed(userId: string) {
    const key = this.getCacheKey(userId);
    await this.redis.del(key);
  }
}
