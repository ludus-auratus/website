import { type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Badge, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/game/game.utils";

export interface GameCartItemProps {
  id: number;
  icon: string;
  name: string;
  studio: string;
  discount?: number;
  originalPrice?: number;
  quantity: number;
  price: number;
}

export default function GameCartItem({
  id,
  icon,
  name,
  studio,
  price,
  discount,
  quantity,
  originalPrice,
}: GameCartItemProps) {
  const t = useTranslations("Cart.item");
  const { removeFromCart } = useCart();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    removeFromCart(id);
  }

  return (
    <Card className="bg-card/50 border-border/50 hover:border-primary/40 border p-0 backdrop-blur-sm transition-all duration-300">
      <Link
        href={`/game/${id}`}
        aria-label={`Ver detalhes do jogo ${name}`}
        className="focus-visible:ring-highlight flex h-full flex-col rounded-2xl transition-all duration-300 outline-none focus-visible:ring-2"
      >
        <CardContent className="p-4">
          <div className="xs:flex-row flex flex-col gap-4">
            <figure className="xs:w-28 relative h-28 w-full flex-shrink-0 self-center overflow-hidden rounded-xl">
              <Image
                src={icon}
                alt={name}
                width={100}
                height={100}
                className="h-full w-full object-cover object-center"
              />
            </figure>

            <div className="min-w-0 flex-1">
              <div className="flex h-full flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="h-full flex-1">
                  <h3 className="font-ludus-pixelify-sans mb-1 truncate text-lg">{name}</h3>
                  <p className="text-muted-foreground text-sm">{studio}</p>

                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">{t("quantity")}</span>
                    <div className="flex items-center gap-1">
                      {/* <Button disabled size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Minus className="h-4 w-4" />
                    </Button> */}

                      <span className="w-8 text-center">{quantity}</span>

                      {/* <Button disabled size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Plus className="h-4 w-4" />
                    </Button> */}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-end sm:justify-start">
                  <div>
                    {discount && originalPrice && (
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-muted-foreground text-sm line-through">
                          {formatPrice(originalPrice * quantity)}
                        </span>
                        <Badge className="bg-primary border-0 px-2 text-xs text-black">-{discount}%</Badge>
                      </div>
                    )}
                    <p className="text-xl font-semibold">{formatPrice(price * quantity)}</p>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 focus:bg-destructive/20 dark:focus-within:ring-destructive z-10"
                    onClick={handleClick}
                    aria-label={t("remove_from_cart", { name })}
                  >
                    <Trash2 className="h-8 w-8" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
