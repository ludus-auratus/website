export interface GameComment {
  author: {
    username: string;
    avatar?: string;
  };
  content: string;
  recommended: boolean;
  publishedAt: Date;
}
