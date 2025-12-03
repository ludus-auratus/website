import { GameCommentDTO } from "./comment.dto";
import { importGameCommentFiles } from "./comment.files";

export async function requestGameTopComments(gameId: number): Promise<GameCommentDTO[]> {
  return importGameCommentFiles();
}
