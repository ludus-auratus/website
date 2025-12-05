"use client";

import { useTranslations } from "next-intl";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatPrice, type Game } from "@/lib/game";

type Props = {
  game: Game;
};

export function GameCartAction({ game }: Props) {
  const t = useTranslations("Games");
  const { addToCart, isInCart } = useCart();
  const alreadyInCart = isInCart(game.id);

  const handleAddToCart = () => {
    if (!alreadyInCart) {
      addToCart({ ...game });
    }
  };

  return (
    <Button className="text-md w-full" variant="accent" onClick={handleAddToCart} disabled={alreadyInCart}>
      <ShoppingCart className={`size-4 ${alreadyInCart ? "fill-current" : "fill-transparent"}`} />
      {alreadyInCart
        ? `${t("in_cart")} (${formatPrice(game.price)})`
        : `${t("add_to_cart")} ${formatPrice(game.price)}`}{" "}
    </Button>
  );
}
