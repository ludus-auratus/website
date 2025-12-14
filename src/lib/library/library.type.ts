import { BackendGame } from "@/lib/game/game.type";

export interface LibraryApiResponse {
  dados: {
    jogos: BackendGame[];
  };
  mensagem: string;
  sucesso: boolean;
}
