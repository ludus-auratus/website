"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { type Game } from "@/lib/game";
import { toggleWishlistGame } from "@/lib/wishlist/wishlist.api";

type Props = {
  game: Game;
};

export function GameFavoriteAction({ game }: Props) {
  const t = useTranslations("Games");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleFavorite = async () => {
    try {
      setIsLoading(true);
      const action = await toggleWishlistGame(1, game.id);

      if (action === "Adicionado") {
        toast.success(t("added_to_wishlist"));
      } else if (action === "Removido") {
        toast.success(t("removed_from_wishlist"));
      } else if (action === "JaNaBiblioteca") {
        toast.error(t("toast_already_in_library"));
        router.push("/profile/my-library");
      }
    } catch (error) {
      console.error("Erro ao atualizar favoritos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button className="w-full" variant="favorite" onClick={handleFavorite} disabled={isLoading}>
      {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Heart className="size-4" />}
      {t("wishlist_add")}
    </Button>
  );
}
