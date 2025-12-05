"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const { addFavorite, isFavorite, removeFavorite, isAuthenticated } = useAuth();
  const alreadyInFavorite = isFavorite(game.id);

  const handleFavorite = () => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    if (alreadyInFavorite) {
      removeFavorite(game.id);
      return;
    }

    addFavorite(game);
  };

  return (
    <Button className="w-full" variant={isFavorite(game.id) ? "destructive" : "favorite"} onClick={handleFavorite}>
      <Heart className={`size-4 ${alreadyInFavorite ? "fill-current" : "fill-transparent"}`} />
      {alreadyInFavorite ? t("wishlist_remove") : t("wishlist_add")}
    </Button>
  );
}
