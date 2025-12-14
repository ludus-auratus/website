import { env } from "@/config/env";
import { mapBackendGameToListItem } from "@/lib/game/game.dto";
import { GameListItem } from "@/lib/game/game.type";

import { WishlistApiResponse } from "./wishlist.type";

const API_URL = `${env.API_BASE_URL}/colecao`;

export async function getUserWishlist(userId: number): Promise<GameListItem[]> {
  const response = await fetch(`${API_URL}/${userId}/ListaDeDesejo`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar lista de desejos: ${response.statusText}`);
  }

  const data = (await response.json()) as WishlistApiResponse;

  if (!data.sucesso) {
    throw new Error(data.mensagem || "Erro ao carregar lista de desejos.");
  }

  return data.dados.jogos ? data.dados.jogos.map(mapBackendGameToListItem) : [];
}

export async function toggleWishlistGame(userId: number, gameId: number): Promise<string> {
  const response = await fetch(`${API_URL}/lista-desejos/alternar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      UsuarioId: userId,
      JogoId: gameId,
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro ao atualizar lista de desejos: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.sucesso) {
    throw new Error(data.mensagem || "Erro ao atualizar lista de desejos.");
  }

  return data.dados.acao;
}
