export interface CartItem {
  id: number;
  name: string;
  price: number;
  icon: string;
  rating: number;
  studio: string;
  quantity: number;
}

export interface CartContextData {
  items: CartItem[];
  addToCart: (game: Omit<CartItem, "quantity">) => boolean;
  removeFromCart: (gameId: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getGamesCount: () => number;
  isInCart: (gameId: number) => boolean;
}
