"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

import { GameCardLibrary } from "@/components/game/GameCardLibrary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { type Game, getAllGames } from "@/lib/game";

export default function MyLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    getAllGames().then((gamesData) => setGames(gamesData.slice(0, 6)));
  }, []);

  const filteredGames = games.filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <TabsContent value="my-library" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground font-ludus-pixelify-sans xs:block hidden text-2xl font-bold">
          Minha Biblioteca
        </h2>

        <div className="xs:flex-none relative ml-auto flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />

          <Input
            placeholder="Buscar jogos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 pl-10"
          />

          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              aria-label="clear_search"
              onClick={() => setSearchTerm("")}
              className="absolute top-1/2 right-1 -translate-y-1/2 transform"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="grid-auto-fill grid gap-6">
        {filteredGames.map((game) => (
          <GameCardLibrary key={game.id} {...game} />
        ))}
      </div>
    </TabsContent>
  );
}
