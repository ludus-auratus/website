"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Loader2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { formatPrice, type Game } from "@/lib/game";
import { checkGameOwnership } from "@/lib/library/library.api";

type Props = {
  game: Game;
};

export function GameCartAction({ game }: Props) {
  const t = useTranslations("Games");
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  const { isAuthenticated } = useAuth();
  const alreadyInCart = isInCart(game.id);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (alreadyInCart) {
      router.push("/cart");
      return;
    }

    try {
      setIsLoading(true);
      const isOwned = await checkGameOwnership(1, game.id);

      if (isOwned) {
        toast.error("Este jogo já está na sua biblioteca.");
        return;
      }

      addToCart({ ...game });
    } catch (error) {
      console.error("Erro ao verificar jogo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button className="text-md w-full" variant="accent" onClick={handleAddToCart} disabled={isLoading}>
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <ShoppingCart className={`size-4 ${alreadyInCart ? "fill-current" : "fill-transparent"}`} />
      )}
      {alreadyInCart
        ? `${t("in_cart")} (${formatPrice(game.price)})`
        : `${t("add_to_cart")} ${formatPrice(game.price)}`}{" "}
    </Button>
  );
}
