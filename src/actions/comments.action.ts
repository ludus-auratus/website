"use server";

import { GameComment } from "@/lib/game/comment";
import { requestGameTopComments } from "@/lib/game/comment/comment.api";

export async function getGameTopComments(gameId: number): Promise<GameComment[]> {
  const dtos = await requestGameTopComments(gameId);
  return dtos.slice(0, 3).map((dto) => {
    return {
      ...dto,
      publishedAt: new Date(dto.publishedAt),
    };
  });
}
