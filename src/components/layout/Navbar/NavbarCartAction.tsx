import { LuShoppingCart } from "react-icons/lu";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NavbarCartActionProps {
  cartItemsCount: number;
}

export function NavbarCartAction({ cartItemsCount }: NavbarCartActionProps) {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="hover:bg-accent/10 active:bg-accent/20 hover:text-foreground relative border-none p-5"
    >
      <Link href="/carrinho" aria-label={`Carrinho, (${cartItemsCount} itens)`}>
        <LuShoppingCart className="size-5" aria-hidden="true" />

        {cartItemsCount > 0 && (
          <Badge
            className="bg-accent text-accent-foreground border-background absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center border-2 p-0 font-sans text-xs"
            aria-hidden="true"
          >
            {cartItemsCount}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
