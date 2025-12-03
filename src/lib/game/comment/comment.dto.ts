export interface GameCommentDTO {
  author: {
    username: string;
    avatar?: string;
  };
  content: string;
  rating: number;
  publishedAt: string;
}
