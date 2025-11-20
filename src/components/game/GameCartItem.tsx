import Image from "next/image";
import Link from "next/link";
import { Badge, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

export interface GameCartItemProps {
  id: number;
  image: string;
  name: string;
  studio: string;
  discount?: number;
  originalPrice?: number;
  quantity: number;
  price: number;
}

export default function GameCartItem({
  id,
  image,
  name,
  studio,
  discount,
  quantity,
  originalPrice,
  price,
}: GameCartItemProps) {
  const { removeFromCart } = useCart();

  return (
    <Card
      key={id}
      className="bg-card/50 border-border/50 hover:border-primary/40 border p-0 backdrop-blur-sm transition-all duration-300"
    >
      <Link
        href={`/game/${id}`}
        className="focus-visible:ring-primary z-0 block rounded-2xl outline-none focus-visible:ring-2"
      >
        <CardContent className="p-4 md:p-6">
          <div className="xs:flex-row flex flex-col gap-4">
            <figure className="xs:w-32 relative h-32 w-full flex-shrink-0 overflow-hidden rounded-xl">
              <Image src={image} alt={name} width={100} height={100} className="h-full w-full object-cover" />
            </figure>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="min-w-0 flex-1">
                  <h3 className="font-ludus-pixelify-sans mb-1 truncate text-lg text-white">{name}</h3>
                  <p className="text-muted-foreground mb-3 text-sm">{studio}</p>
                </div>

                <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-end sm:justify-start">
                  <div className="text-right">
                    {discount && originalPrice && (
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-muted-foreground text-sm line-through">
                          R$ {(originalPrice * quantity).toFixed(2)}
                        </span>
                        <Badge className="bg-ludus-lime-400 border-0 px-2 text-xs text-black">-{discount}%</Badge>
                      </div>
                    )}
                    <p className="text-ludus-yellow-400 text-xl font-semibold">R$ {(price * quantity).toFixed(2)}</p>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 z-50"
                    onClick={() => removeFromCart(id)}
                    aria-label={`Remover ${name} do carrinho`}
                  >
                    <Trash2 className="h-4 w-4" />
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
