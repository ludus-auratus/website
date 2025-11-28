"use client";

import { useState } from "react";
import Link from "next/link";
import { Library, Search, ShoppingBag, X } from "lucide-react";

import { GameCardLibrary } from "@/components/game/GameCardLibrary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";

export default function MyLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { library } = useAuth();

  const filteredGames = library.filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Tabs defaultValue="my-library" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="my-library" asChild>
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
            <GameCardLibrary key={game.id} id={game.id} name={game.name} icon={game.icon} rating={game.rating} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
