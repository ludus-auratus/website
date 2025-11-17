import { Game } from "../game";

export interface CartItem extends Game {
  quantity: 1;
}

export interface CartContextData {
  items: CartItem[];
  addToCart: (game: Game) => boolean;
  removeFromCart: (gameId: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getGamesCount: () => number;
  isInCart: (gameId: number) => boolean;
}
