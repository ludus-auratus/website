"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Game } from "@/lib/game";

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
    <Button className="w-full" variant="accent" onClick={handleClick} disabled={alreadyInCart}>
      {alreadyInCart ? "Já no carrinho" : "Adicionar ao carrinho"}
    </Button>
  );
}
