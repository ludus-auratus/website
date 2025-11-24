"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export function NavbarCartAction() {
  const { getGamesCount } = useCart();
  const cartItemsCount = getGamesCount();

  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="hover:bg-accent/10 active:bg-accent/20 hover:text-foreground relative border-none p-2"
    >
      <Link href="/cart" aria-label={`Carrinho, (${cartItemsCount} itens)`}>
        <ShoppingCart className="size-5" aria-hidden="true" />

        {cartItemsCount > 0 && (
          <Badge
            className="bg-accent text-accent-foreground border-background absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center border-2 p-0 text-xs"
            aria-hidden="true"
          >
            {cartItemsCount}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
