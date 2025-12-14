import { env } from "@/config/env";
import { mapBackendGameToListItem } from "@/lib/game/game.dto";
import { GameListItem } from "@/lib/game/game.type";

import { LibraryApiResponse } from "./library.type";

const API_URL = `${env.API_BASE_URL}/colecao`;

export async function getUserLibrary(userId: number): Promise<GameListItem[]> {
  const response = await fetch(`${API_URL}/${userId}/Biblioteca`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar biblioteca: ${response.statusText}`);
  }

  const data = (await response.json()) as LibraryApiResponse;

  if (!data.sucesso) {
    throw new Error(data.mensagem || "Erro ao carregar biblioteca.");
  }

  return data.dados.jogos.map(mapBackendGameToListItem);
}

export async function checkGameOwnership(userId: number, gameId: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/possui-jogo/${userId}/${gameId}`);

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.dados;
  } catch (error) {
    console.error("Erro ao verificar propriedade do jogo:", error);
    return false;
  }
}
