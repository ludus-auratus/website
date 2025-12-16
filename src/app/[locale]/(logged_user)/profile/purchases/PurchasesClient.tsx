"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";

import { PurchaseCard } from "@/components/game/PurchaseCard";
import { Button } from "@/components/ui/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { env } from "@/config/env";
import { formatPrice } from "@/lib/game";
import { RetornoPedidoDto } from "@/lib/order/order.dto";

interface PurchasesPageContentProps {
  initialPurchases: RetornoPedidoDto[];
}

export default function PurchasesPageContent({ initialPurchases }: PurchasesPageContentProps) {
  const t = useTranslations("Profile");

  const totalSpent = initialPurchases.reduce((total, purchase) => total + purchase.total, 0);

  return (
    <div className="space-y-6">
      <div className="xs:flex-row xs:justify-between flex flex-col items-center justify-center gap-2">
        <h2 className="text-foreground font-ludus-pixelify-sans xs:block text-2xl font-bold">{t("purchases.title")}</h2>

        <div className="text-right">
          <p className="text-muted-foreground w-fit text-sm">{t("purchases.total_spent")}</p>
          <p className="text-highlight text-xl font-bold">{formatPrice(totalSpent)}</p>
        </div>
      </div>

      <div className="grid gap-6">
        {initialPurchases.length === 0 ? (
          <EmptyState>
            <EmptyStateIcon icon={ShoppingBag} />
            <EmptyStateTitle>{t("purchases.empty.title")}</EmptyStateTitle>
            <EmptyStateDescription>{t("purchases.empty.description")}</EmptyStateDescription>
            <EmptyStateActions>
              <Button size="lg" asChild>
                <Link href="/catalog">{t("purchases.empty.button")}</Link>
              </Button>
            </EmptyStateActions>
          </EmptyState>
        ) : (
          initialPurchases.map((purchase) => (
            <PurchaseCard
              key={purchase.id}
              orderId={purchase.id}
              createdAt={new Date(purchase.data)}
              status={purchase.status}
              items={purchase.itens.map((item) => ({
                id: item.jogoId,
                name: item.jogoNome,
                icon: `${env.BASE_URL}${item.urlIconeJogo}`,
                price: item.precoUnitario,
              }))}
              total={purchase.total}
            />
          ))
        )}
      </div>
    </div>
  );
}
