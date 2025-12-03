export interface GameComment {
  author: {
    username: string;
    avatar?: string;
  };
  content: string;
  rating: number;
  publishedAt: Date;
}
