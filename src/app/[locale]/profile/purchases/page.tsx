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
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/game";

export default function PurchasesPage() {
  const t = useTranslations("Profile");
  const { purchases } = useAuth();

  const totalSpent = purchases.reduce((total, purchase) => total + purchase.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground font-ludus-pixelify-sans xs:block hidden text-2xl font-bold">
          {t("purchases.title")}
        </h2>

        <div className="text-right">
          <p className="text-muted-foreground text-sm">{t("purchases.total_spent")}</p>
          <p className="text-highlight text-xl font-bold">{formatPrice(totalSpent)}</p>
        </div>
      </div>

      <div className="grid gap-6">
        {purchases.length === 0 ? (
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
          purchases.map((purchase) => (
            <PurchaseCard
              key={purchase.orderId}
              orderId={purchase.orderId}
              createdAt={purchase.createdAt}
              status={purchase.status}
              items={purchase.items}
              total={purchase.total}
            />
          ))
        )}
      </div>
    </div>
  );
}
