import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AppService {
  constructor(
    // --- SYNC (REST-style RPC) ---
    @Inject("USERS_SERVICE") private readonly usersClient: ClientProxy,
    @Inject("POSTS_SERVICE") private readonly postsClient: ClientProxy,
    @Inject("FEED_SERVICE") private readonly feedClient: ClientProxy,
    @Inject("MESSAGING_SERVICE") private readonly messagingClient: ClientProxy,

    // --- ASYNC (Kafka events) ---
    @Inject("USERS_EVENTS") private readonly usersEvents: ClientProxy,
    @Inject("POSTS_EVENTS") private readonly postsEvents: ClientProxy,
    @Inject("FEED_EVENTS") private readonly feedEvents: ClientProxy,
    @Inject("SEARCH_EVENTS") private readonly searchEvents: ClientProxy,
    @Inject("MESSAGING_EVENTS") private readonly messagingEvents: ClientProxy
  ) {}

  //------------------------------
  // SYNC RPC METHODS
  //------------------------------

  getUserProfile(userId: string) {
    return this.usersClient.send("user.profile.get", { userId });
  }

  updateUserProfile(userId: string, dto: any) {
    return this.usersClient.send("user.profile.update", { userId, dto });
  }

  createPost(authorId: string, dto: any) {
    return this.postsClient.send("post.create", { authorId, ...dto });
  }

  getHomeFeed(userId: string) {
    return this.feedClient.send("feed.home", { userId });
  }

  //------------------------------
  // ASYNC EVENTS (KAFKA)
  //------------------------------

  emitProfileUpdatedEvent(userId: string, dto: any) {
    this.usersEvents.emit("user.updated", { userId, ...dto });
    this.searchEvents.emit("search.index.profile", { userId });
  }

  emitPostCreatedEvent(post: any) {
    this.postsEvents.emit("post.created", post);
    this.feedEvents.emit("feed.rebuild", {
      postId: post.id,
      authorId: post.authorId,
    });
    this.searchEvents.emit("search.index.post", { postId: post.id });
  }
}
