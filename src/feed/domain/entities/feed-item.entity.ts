export interface FeedItem {
    id: string;
    type: 'post' | 'comment';
    authorId: string;
    content: string;
    createdAt: string;
  }
  