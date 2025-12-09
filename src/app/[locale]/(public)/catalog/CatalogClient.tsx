"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";

import { GameCard } from "@/components/game/GameCard";
import { GameCardSkeleton } from "@/components/game/GameCardSkeleton";
import { Catalog } from "@/components/pages/catalog";
import { Button } from "@/components/ui/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { useCatalogFilters } from "@/hooks/useCatalogFilters";
import { GameListItem } from "@/lib/game/game.type";

interface CatalogPageContentProps {
  initialGames: GameListItem[];
}

export default function CatalogPageContent({ initialGames }: CatalogPageContentProps) {
  const t = useTranslations("Catalog");
  const [games] = useState<GameListItem[]>(initialGames);
  const [isLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => <GameCardSkeleton key={index} />)
        ) : filters.games.length === 0 ? (
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
    </Catalog.Root>
  );
}
