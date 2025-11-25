"use client";

import { useEffect, useState } from "react";

import { GameCard } from "@/components/game/GameCard";
import { Catalog } from "@/components/pages/catalog";
import { getGameDataById } from "@/lib/game/game.api";
import { Game } from "@/lib/game/game.type";

export default function CatalogPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [sortBy, setSortBy] = useState("popular");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getGameDataById().then((game) => {
      setGames(Array(12).fill(game));
    });
  }, []);

  const filteredGames = games.filter((game) => {
    return game.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortedGames = filteredGames.sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <Catalog.Root>
      <Catalog.Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      <Catalog.Grid showFilters={showFilters}>
        {sortedGames.map((game, index) => (
          <GameCard key={`${game.id}-${index}`} id={game.id} name={game.name} icon={game.icon} price={game.price} />
        ))}
      </Catalog.Grid>
    </Catalog.Root>
  );
}
