"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { AlertCircle, CreditCard, ShoppingCart } from "lucide-react";

import GameCartItem from "@/components/game/GameCartItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/game";

export default function Cart() {
  const t = useTranslations("Cart");
  const { items, clearCart, getCartTotal, getGamesCount } = useCart();

  const subtotal = getCartTotal();
  const total = subtotal;
  const totalItems = getGamesCount();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 md:py-12">
        <Card className="bg-card/50 border-border/50 border backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="bg-primary/10 mb-6 inline-flex h-24 w-24 items-center justify-center rounded-3xl">
              <ShoppingCart className="text-primary h-12 w-12" />
            </div>

            <h2 className="font-ludus-pixelify-sans mb-4 text-2xl md:text-3xl">{t("empty.title")}</h2>

            <p className="text-muted-foreground mx-auto mb-8 max-w-md">{t("empty.description")}</p>

            <Button size="lg" asChild>
              <Link href="/catalog">{t("empty.explore_button")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 md:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <h1 className="font-ludus-pixelify-sans mb-6 text-3xl md:text-4xl">{t("title")}</h1>

          {items.map((item) => (
            <GameCartItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              name={item.name}
              studio={item.studio}
              quantity={item.quantity}
              price={item.price}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <h2 className="font-ludus-pixelify-sans mb-4 text-2xl">{t("summary.title")}</h2>

            <Card className="bg-card/50 border-border/50 border p-0 backdrop-blur-sm">
              <CardContent className="space-y-4 p-6">
                <div className="border-border/50 flex items-center justify-between border-b pb-3">
                  <span className="text-muted-foreground">
                    {t("summary.subtotal")} ({totalItems} {totalItems === 1 ? t("summary.item") : t("summary.items")})
                  </span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-ludus-pixelify-sans text-lg">{t("summary.total")}</span>
                  <span className="text-2xl">{formatPrice(total)}</span>
                </div>

                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4 w-full">
                  <CreditCard className="mr-2 h-5 w-5" />
                  {t("summary.checkout_button")}
                </Button>

                <div className="bg-primary/5 mt-4 flex items-center gap-2 rounded-lg p-3">
                  <AlertCircle className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
                  <p className="text-muted-foreground text-xs">{t("summary.security_message")}</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/">{t("summary.continue_shopping")}</Link>
              </Button>

              <Button variant="destructive" className="w-full" onClick={clearCart}>
                {t("summary.clear_cart")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
