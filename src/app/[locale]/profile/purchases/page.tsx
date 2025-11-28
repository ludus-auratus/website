"use client";

import Link from "next/link";
import { Library, ShoppingBag } from "lucide-react";

import { PurchaseCard } from "@/components/game/PurchaseCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/game";

export default function PurchasesPage() {
  const { purchases } = useAuth();

  const totalSpent = purchases.reduce((total, purchase) => total + purchase.total, 0);

  return (
    <Tabs defaultValue="purchases" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="library" asChild>
          <Link href="/profile/my-library">
            <Library className="mr-2 h-4 w-4" />
            Biblioteca
          </Link>
        </TabsTrigger>

        <TabsTrigger value="purchases" asChild>
          <Link href="/profile/purchases">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Compras
          </Link>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="purchases" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-foreground font-ludus-pixelify-sans xs:block hidden text-2xl font-bold">
            Compras Recentes
          </h2>

          <div className="text-right">
            <p className="text-muted-foreground text-sm">Total gasto</p>
            <p className="text-highlight text-xl font-bold">{formatPrice(totalSpent)}</p>
          </div>
        </div>

        <div className="grid gap-6">
          {purchases.map((purchase) => (
            <PurchaseCard
              key={purchase.orderId}
              orderId={purchase.orderId}
              createdAt={purchase.createdAt}
              status={purchase.status}
              items={purchase.items}
              total={purchase.total}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
