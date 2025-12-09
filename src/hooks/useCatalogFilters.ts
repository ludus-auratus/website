import { useMemo, useState } from "react";

import { GameListItem } from "@/lib/game/game.type";

export type SortBy = "popular" | "price-low" | "price-high" | "name";

export function useCatalogFilters(games: GameListItem[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("popular");

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  function toggleItem(value: string, list: string[], setList: (v: string[]) => void) {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  function toggleGenre(genre: string) {
    toggleItem(genre, selectedGenres, setSelectedGenres);
  }

  function toggleTag(tag: string) {
    toggleItem(tag, selectedTags, setSelectedTags);
  }

  function togglePlatform(platform: string) {
    toggleItem(platform, selectedPlatforms, setSelectedPlatforms);
  }

  function clearFilters() {
    setSearchTerm("");
    setSortBy("popular");
    setSelectedGenres([]);
    setSelectedTags([]);
    setSelectedPlatforms([]);
  }

  const filteredAndSortedGames = useMemo(() => {
    return games
      .filter((game) => {
        const matchSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchGenre =
          selectedGenres.length === 0 || selectedGenres.every((genre) => game.tags.genders.includes(genre));

        const matchTags = selectedTags.length === 0 || selectedTags.every((tag) => game.tags.features.includes(tag));

        // A filtragem da plataforma está desativada no momento, pois os dados do jogo não contêm informações sobre a plataforma
        // const matchPlatform = selectedPlatforms.length === 0 || ...

        return matchSearch && matchGenre && matchTags;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "popular":
            return b.rating - a.rating;
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
  }, [games, searchTerm, sortBy, selectedGenres, selectedTags]);

  return {
    games: filteredAndSortedGames,

    searchTerm,
    setSearchTerm,

    sortBy,
    setSortBy,

    selectedGenres,
    toggleGenre,

    selectedTags,
    toggleTag,

    selectedPlatforms,
    togglePlatform,

    clearFilters,
  };
}
