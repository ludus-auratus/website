"use client";

import { useEffect, useState } from "react";

import { GameCardPurchase } from "@/components/game/GameCardPurchase";
import { TabsContent } from "@/components/ui/tabs";
import { type Game, getAllGames } from "@/lib/game";

export default function PurchasesPage() {
  const [recentPurchases, setRecentPurchases] = useState<Game[]>([]);

  useEffect(() => {
    getAllGames().then((gamesData) => setRecentPurchases(gamesData.slice(0, 6)));
  }, []);

  return (
    <TabsContent value="purchases" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground font-ludus-pixelify-sans xs:block hidden text-2xl font-bold">
          Compras Recentes
        </h2>

        <div className="text-right">
          <p className="text-muted-foreground text-sm">Total gasto</p>
          <p className="text-highlight/80 font-ludus-pixelify-sans text-xl font-bold">R$ 3000</p>
        </div>
      </div>

      <div className="grid gap-6">
        {recentPurchases.map((game) => (
          <GameCardPurchase key={game.id} name={game.name} icon={game.icon} id={game.id} price={game.price} />
        ))}
      </div>
    </TabsContent>
  );
}
