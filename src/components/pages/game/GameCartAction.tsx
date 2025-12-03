"use client";

import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatPrice, type Game } from "@/lib/game";

type Props = {
  game: Game;
};

export function GameCartAction({ game }: Props) {
  const { addToCart, isInCart } = useCart();
  const alreadyInCart = isInCart(game.id);

  const handleClick = () => {
    if (!alreadyInCart) {
      addToCart({ ...game });
    }
  };

  return (
    <Button className="w-full" variant="accent" onClick={handleClick} disabled={alreadyInCart}>
      <ShoppingCart />
      {alreadyInCart ? `No carrinho (${formatPrice(game.price)})` : `Comprar ${formatPrice(game.price)}`}{" "}
    </Button>
  );
}
