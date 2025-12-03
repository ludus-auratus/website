"use client";

import { ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatPrice, Game } from "@/lib/game";

type Props = {
  game: Game;
};

export default function GameCartActions({ game }: Props) {
  const { addToCart, isInCart } = useCart();
  const alreadyInCart = isInCart(game.id);

  const handleClick = () => {
    if (!alreadyInCart) {
      addToCart(game);
    }
  };

  return (
    <div className="space-y-2">
      <Button className="w-full" onClick={handleClick} variant={"accent"} disabled={alreadyInCart}>
        <ShoppingCart />
        {alreadyInCart ? `No carrinho (${formatPrice(game.price)})` : `Comprar ${formatPrice(game.price)}`}
      </Button>
      <Button className="w-full">
        <Star />
        Adicionar à lista de desejos
      </Button>
    </div>
  );
}
