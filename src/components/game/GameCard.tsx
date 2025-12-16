import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Heart, Loader2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/game/game.utils";
import { checkGameOwnership } from "@/lib/library/library.api";
import { toggleWishlistGame } from "@/lib/wishlist/wishlist.api";

import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface GameCardProps {
  id: number;
  name: string;
  price: number;
  icon: string;
  rating: number;
  studio: string;
}

export function GameCard({ name, price, icon, id, rating, studio }: GameCardProps) {
  const router = useRouter();
  const t = useTranslations("Games");
  const { addToCart, isInCart } = useCart();
  const alreadyInCart = isInCart(id);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = React.useState(false);

  const handleAddToCart = async () => {
    if (alreadyInCart) {
      router.push("/cart");
      return;
    }

    try {
      setIsLoading(true);
      const isOwned = await checkGameOwnership(1, id);

      if (isOwned) {
        toast.error(t("toast_already_in_library"));
        router.push("/profile/my-library");
        return;
      }

      addToCart({ id, name, icon, rating, price, studio });
    } catch (error) {
      console.error("Erro ao verificar jogo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      setIsFavoriteLoading(true);
      const action = await toggleWishlistGame(1, id); // User ID hardcoded to 1 for now as per previous context

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
      setIsFavoriteLoading(false);
    }
  };

  return (
    <article className="group hover:border-primary/60 hover:shadow-primary/10 bg-card text-card-foreground border-border relative mx-auto flex h-full max-w-[264px] min-w-[264px] flex-col rounded-2xl border shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-full sm:max-w-full">
      <Link
        aria-label={`Ver detalhes do jogo ${name}`}
        href={`/game/${id}`}
        className="focus-visible:ring-highlight flex h-full flex-col rounded-2xl transition-all duration-300 outline-none focus-visible:-translate-y-1 focus-visible:ring-2"
      >
        <figure className="relative aspect-square w-full overflow-hidden rounded-t-2xl">
          <Image
            src={icon}
            alt={`Capa do jogo ${name}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw,
           (max-width: 768px) 50vw,
           (max-width: 1024px) 33vw,
           25vw"
          />
        </figure>

        <div className="flex min-h-[108px] flex-grow flex-col gap-1 p-4">
          <div className="min-h-[76px] flex-1">
            <h3 className="text-ludus-yellow-400 font-ludus-pixelify-sans line-clamp-2 text-lg font-semibold break-words">
              {name}
            </h3>
            <p className="text-muted-foreground/80 line-clamp-1 text-sm font-medium">{studio}</p>
          </div>

          <div className="flex items-center justify-between gap-2" onClick={(e) => e.preventDefault()}>
            <Button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="text-md bg-primary group-hover: text-primary-foreground sm:text-card-foreground sm:group-hover:bg-primary sm:group-focus-within:bg-primary sm:group-hover:text-primary-foreground sm:group-focus-within:text-primary-foreground focus:bg-primary relative w-full flex-1 justify-center !p-0 font-medium shadow-md transition-all duration-300 sm:justify-start sm:bg-transparent sm:shadow-none sm:group-focus-within:justify-center sm:group-focus-within:shadow-md sm:group-hover:justify-center sm:group-hover:shadow-md"
            >
              {isLoading ? (
                <Loader2 className="mr-2 block h-4 w-4 animate-spin self-center sm:hidden sm:group-focus-within:block sm:group-hover:block" />
              ) : (
                <ShoppingCart
                  className={`mr-2 block h-4 w-4 self-center sm:hidden sm:group-focus-within:block sm:group-hover:block ${alreadyInCart ? "fill-current" : "fill-transparent"}`}
                />
              )}
              <span className="flex items-center justify-center text-center transition-all duration-300 sm:hidden sm:group-focus-within:flex sm:group-hover:flex">
                {alreadyInCart ? t("in_cart") : formatPrice(price)}
              </span>

              <span className="hidden text-start transition-all duration-300 sm:block sm:group-focus-within:hidden sm:group-hover:hidden">
                {formatPrice(price)}
              </span>
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      className="focus-visible:border-destructive focus-visible:ring-destructive disabled:opacity-0 group-focus-within:disabled:opacity-50 group-hover:disabled:opacity-50 sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100"
                      variant={"favorite"}
                      onClick={handleToggleFavorite}
                      disabled={isFavoriteLoading}
                    >
                      {isFavoriteLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Heart className="h-4 w-4" />}
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("wishlist_add")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </Link>
    </article>
  );
}
