"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Library, ShoppingBag } from "lucide-react";

import { PurchaseCard } from "@/components/game/PurchaseCard";
import { Button } from "@/components/ui/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/game";

export default function PurchasesPage() {
  const t = useTranslations("Profile");
  const { purchases } = useAuth();

  const totalSpent = purchases.reduce((total, purchase) => total + purchase.total, 0);

  return (
    <Tabs defaultValue="purchases" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="library" asChild>
          <Link href="/profile/my-library">
            <Library className="mr-2 h-4 w-4" />
            {t("tabs.library")}
          </Link>
        </TabsTrigger>

        <TabsTrigger value="purchases" asChild>
          <Link href="/profile/purchases">
            <ShoppingBag className="mr-2 h-4 w-4" />
            {t("tabs.purchases")}
          </Link>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="purchases" className="space-y-6">
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
      </TabsContent>
    </Tabs>
  );
}
