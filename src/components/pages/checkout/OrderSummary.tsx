import Image from "next/image";
import { useTranslations } from "next-intl";
import { CheckCircle2, QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/lib/cart/cart.type";
import { formatPrice } from "@/lib/game";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  total: number;
  totalItems: number;
  onGeneratePix: () => void;
}

export function OrderSummary({ items, subtotal, total, totalItems, onGeneratePix }: OrderSummaryProps) {
  const t = useTranslations("Checkout");
  return (
    <div className="sticky top-24 space-y-8">
      <h2 className="font-ludus-pixelify-sans mb-6 text-2xl">{t("order_summary")}</h2>

      <Card className="bg-card/50 border-border/50 border backdrop-blur-sm">
        <CardContent className="space-y-6 p-6">
          <div className="max-h-64 space-y-6 overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.id} className="space-y-3">
                <div className="flex items-start gap-4">
                  {item.icon && (
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="h-16 w-16 rounded object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-medium">{item.name}</p>
                    <p className="text-muted-foreground text-sm">{item.studio}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-muted-foreground text-xs">{t("qty", { count: item.quantity })}</span>
                      <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("subtotal", { count: totalItems })}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-ludus-pixelify-sans text-lg">{t("total")}</span>
              <span className="font-ludus-pixelify-sans text-2xl">{formatPrice(total)}</span>
            </div>
          </div>

          <Button size="lg" className="w-full" onClick={onGeneratePix}>
            <QrCode className="mr-2 h-5 w-5" />
            {t("generate_pix")}
          </Button>

          <div className="bg-primary/5 mt-4 flex items-center gap-2 rounded-lg p-3">
            <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
            <p className="text-muted-foreground text-xs">{t("pix_redirect_info")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
