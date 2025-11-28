"use client";

import { useEffect, useState } from "react";

import { GameCard } from "@/components/game/GameCard";
import { Catalog } from "@/components/pages/catalog";
import { Spinner } from "@/components/ui/spinner";
import { useCatalogFilters } from "@/hooks/useCatalogFilters";
import { getAllGames } from "@/lib/game/game.api";
import { Game } from "@/lib/game/game.type";

export default function CatalogPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getAllGames().then((games) => {
      setGames(games);
    });
  }, []);

  const filters = useCatalogFilters(games);

  return (
    <Catalog.Root>
      <Catalog.Header
        searchTerm={filters.searchTerm}
        setSearchTerm={filters.setSearchTerm}
        sortBy={filters.sortBy}
        setSortBy={filters.setSortBy}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      {filters.games.length === 0 ? (
        <div className="flex h-48 w-full items-center justify-center gap-2">
          <Spinner className="size-8" />
          <p>Carregando...</p>
        </div>
      ) : (
        <Catalog.Grid
          showFilters={showFilters}
          sidebar={
            <Catalog.Sidebar
              selectedGenres={filters.selectedGenres}
              toggleGenre={filters.toggleGenre}
              selectedTags={filters.selectedTags}
              toggleTag={filters.toggleTag}
              selectedPlatforms={filters.selectedPlatforms}
              togglePlatform={filters.togglePlatform}
              clearFilters={filters.clearFilters}
            />
          }
        >
          {filters.games.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              icon={game.icon}
              price={game.price}
              rating={game.rating}
            />
          ))}
        </Catalog.Grid>
      )}
    </Catalog.Root>
  );
}
