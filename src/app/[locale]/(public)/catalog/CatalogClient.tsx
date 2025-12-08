"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";

import { GameCard } from "@/components/game/GameCard";
import { Catalog } from "@/components/pages/catalog";
import { Button } from "@/components/ui/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { Spinner } from "@/components/ui/spinner";
import { useCatalogFilters } from "@/hooks/useCatalogFilters";
import { getAllGames } from "@/lib/game/game.api";
import { Game } from "@/lib/game/game.type";

export default function CatalogPageContent() {
  const t = useTranslations("Catalog");
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getAllGames()
      .then((games) => {
        setGames(games);
      })
      .finally(() => {
        setIsLoading(false);
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

      {isLoading ? (
        <div className="flex h-48 w-full items-center justify-center gap-2">
          <Spinner className="size-8" />
          <p>{t("loading")}</p>
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
          {filters.games.length === 0 ? (
            <div className="col-span-full">
              <EmptyState>
                <EmptyStateIcon icon={Search} />
                <EmptyStateTitle>{t("empty.title")}</EmptyStateTitle>
                <EmptyStateDescription>{t("empty.description")}</EmptyStateDescription>
                <EmptyStateActions>
                  <Button onClick={filters.clearFilters}>{t("empty.clear_filters")}</Button>
                </EmptyStateActions>
              </EmptyState>
            </div>
          ) : (
            filters.games.map((game) => (
              <GameCard
                key={game.id}
                id={game.id}
                name={game.name}
                price={game.price}
                icon={game.icon}
                rating={game.rating}
                studio={game.studio}
              />
            ))
          )}
        </Catalog.Grid>
      )}
    </Catalog.Root>
  );
}
