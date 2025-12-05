import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/game/game.utils";

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
  const { addFavorite, removeFavorite, isFavorite, isGameInLibrary } = useAuth();
  const { addToCart, isInCart } = useCart();
  const alreadyInCart = isInCart(id);

  const handleAddToCart = () => {
    if (alreadyInCart) {
      router.push("/cart");
    }

    if (!isGameInLibrary(id)) {
      addToCart({ id, name, icon, rating, price, studio });
    }
  };

  function handleToggleFavorite(id: number) {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite({ id, name, icon, rating, price, studio });
    }
  }

  return (
    <article className="group hover:border-primary/60 hover:shadow-primary/10 bg-card text-card-foreground border-border relative mx-auto flex h-full max-w-[264px] min-w-[264px] flex-col rounded-2xl border shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-full sm:max-w-full">
      <Link
        aria-label={`Ver detalhes do jogo ${name}`}
        href={`/game/${id}`}
        className="focus-visible:ring-highlight flex h-full flex-col rounded-2xl transition-all duration-300 outline-none focus-visible:-translate-y-1 focus-visible:ring-2"
      >
        <div className="bg-background/90 absolute top-3 right-3 z-10 flex items-center space-x-1 rounded-full px-3 py-1 backdrop-blur-sm">
          {rating > 0 ? (
            <>
              <Star className="text-accent h-4 w-4 fill-current" />
              <span>{rating}</span>
            </>
          ) : (
            <Star className="text-muted-foreground h-5 w-5 fill-current" />
          )}
        </div>

        <figure className="relative h-60 w-full flex-shrink-0 overflow-hidden rounded-t-2xl">
          <Image src={icon} alt={`Capa do jogo ${name}`} fill className="h-full w-full object-cover" />
        </figure>

        <div className="flex min-h-[108px] flex-grow flex-col gap-1 p-4">
          <div className="min-h-[76px] flex-1">
            <h3 className="text-ludus-yellow-400 font-ludus-pixelify-sans line-clamp-2 text-lg font-semibold break-words">
              {name}
            </h3>
            <p className="text-muted-foreground/80 line-clamp-1 text-sm font-medium">{studio}</p>
          </div>

          <div
            className="flex items-center justify-between gap-2"
            onClick={(e) => !isGameInLibrary(id) && e.preventDefault()}
          >
            <Button
              onClick={handleAddToCart}
              className="text-md bg-primary group-hover: text-primary-foreground sm:text-card-foreground sm:group-hover:bg-primary sm:group-focus-within:bg-primary sm:group-hover:text-primary-foreground sm:group-focus-within:text-primary-foreground focus:bg-primary relative w-full flex-1 justify-center font-medium shadow-md transition-all duration-300 sm:justify-start sm:bg-transparent sm:shadow-none sm:group-focus-within:justify-center sm:group-focus-within:shadow-md sm:group-hover:justify-center sm:group-hover:shadow-md"
            >
              {isGameInLibrary(id) ? (
                <Eye className="mr-2 block h-4 w-4 self-center sm:hidden sm:group-focus-within:block sm:group-hover:block" />
              ) : (
                <ShoppingCart
                  className={`mr-2 block h-4 w-4 self-center sm:hidden sm:group-focus-within:block sm:group-hover:block ${alreadyInCart ? "fill-current" : "fill-transparent"}`}
                />
              )}
              <span className="flex items-center justify-center text-center transition-all duration-300 sm:hidden sm:group-focus-within:flex sm:group-hover:flex">
                {isGameInLibrary(id) ? t("view_game") : alreadyInCart ? t("in_cart") : formatPrice(price)}
              </span>

              <span className="hidden text-start transition-all duration-300 sm:block sm:group-focus-within:hidden sm:group-hover:hidden">
                {formatPrice(price)}
              </span>
            </Button>

            {!isGameInLibrary(id) && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        className="focus-visible:border-destructive focus-visible:ring-destructive disabled:opacity-0 group-focus-within:disabled:opacity-50 group-hover:disabled:opacity-50 sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100"
                        variant={isFavorite(id) ? "destructive" : "favorite"}
                        onClick={() => handleToggleFavorite(id)}
                      >
                        <Heart className={isFavorite(id) ? "fill-current" : ""} />
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isFavorite(id) ? t("wishlist_remove") : t("wishlist_add")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
