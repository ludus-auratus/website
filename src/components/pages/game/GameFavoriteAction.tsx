"use client";

import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { type Game } from "@/lib/game";

type Props = {
  game: Game;
};

export function GameFavoriteAction({ game }: Props) {
  const t = useTranslations("Games");
  const { addFavorite, isFavorite, removeFavorite } = useAuth();
  const alreadyInFavorite = isFavorite(game.id);

  const handleClick = () => {
    if (alreadyInFavorite) {
      removeFavorite(game.id);
    } else {
      addFavorite(game);
    }
  };

  return (
    <Button className="w-full" variant={isFavorite(game.id) ? "destructive" : "favorite"} onClick={handleClick}>
      <Heart />
      {alreadyInFavorite ? t("wishlist_remove") : t("wishlist_add")}
    </Button>
  );
}
