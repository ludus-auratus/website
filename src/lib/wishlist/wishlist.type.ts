import { BackendGame } from "@/lib/game/game.type";

export interface WishlistApiResponse {
  dados: {
    jogos: BackendGame[];
  };
  mensagem: string;
  sucesso: boolean;
}
