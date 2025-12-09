import { env } from "@/config/env";

import { mapBackendGameToFrontend, mapBackendGameToListItem } from "./game.dto";
import type { ApiResponse, BackendGame, Game, GameListItem } from "./game.type";

const API_URL = `${env.API_BASE_URL}/jogo`;

export async function getGameDataById(id: number): Promise<Game> {
  const response = await requestGameDataById(id);
  return mapBackendGameToFrontend(response.dados);
}

export async function requestGameDataById(id: number): Promise<ApiResponse<BackendGame>> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar jogo: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function getAllGames(): Promise<GameListItem[]> {
  const response = await requestAllGames();
  return response.dados.map(mapBackendGameToListItem);
}

export async function requestAllGames(): Promise<ApiResponse<BackendGame[]>> {
  const response = await fetch(`${API_URL}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar jogos: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function publishGame(formData: FormData) {
  try {
    const response = await fetch(`${env.API_BASE_URL}/jogo`, {
      method: "POST",
      body: formData,
    });

    const body = (await response.json()) as ApiResponse<BackendGame>;

    if (!response.ok || !body.sucesso) {
      throw new Error(body.mensagem || "Erro inesperado ao publicar jogo");
    }

    return body;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Ocorreu um erro desconhecido ao tentar publicar o jogo.");
  }
}

export async function incrementGameViews(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}/visualizacao`, {
    method: "PATCH",
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.mensagem || `Erro ao incrementar visualizações: ${response.statusText}`);
  }
}

export async function incrementGameDownloads(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}/download`, {
    method: "PATCH",
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.mensagem || `Erro ao incrementar downloads: ${response.statusText}`);
  }
}
