export interface GameCommentDTO {
  author: {
    username: string;
    avatar?: string;
  };
  content: string;
  recommended: boolean;
  publishedAt: string;
}
