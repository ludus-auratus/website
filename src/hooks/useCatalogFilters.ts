import { useMemo, useState } from "react";

import { GameListItem } from "@/lib/game/game.type";

export type SortBy = "popular" | "price-low" | "price-high" | "name";

export function useCatalogFilters(games: GameListItem[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("popular");

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  function toggleItem(value: string, list: string[], setList: (v: string[]) => void) {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  function toggleGenre(genre: string) {
    toggleItem(genre, selectedGenres, setSelectedGenres);
  }

  function toggleFeature(feature: string) {
    toggleItem(feature, selectedFeatures, setSelectedFeatures);
  }

  function toggleAccessibility(item: string) {
    toggleItem(item, selectedAccessibility, setSelectedAccessibility);
  }

  function togglePlatform(platform: string) {
    toggleItem(platform, selectedPlatforms, setSelectedPlatforms);
  }

  function clearFilters() {
    setSearchTerm("");
    setSortBy("popular");
    setSelectedGenres([]);
    setSelectedFeatures([]);
    setSelectedAccessibility([]);
    setSelectedPlatforms([]);
  }

  const filteredAndSortedGames = useMemo(() => {
    return games
      .filter((game) => {
        const matchSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchGenre =
          selectedGenres.length === 0 || selectedGenres.every((genre) => game.tags.genders.includes(genre));

        const matchFeatures =
          selectedFeatures.length === 0 || selectedFeatures.every((feature) => game.tags.features.includes(feature));

        const matchAccessibility =
          selectedAccessibility.length === 0 ||
          selectedAccessibility.every((item) => game.tags.accessibility.includes(item));

        const matchPlatform =
          selectedPlatforms.length === 0 ||
          selectedPlatforms.every((platform) => game.tags.platforms.includes(platform));

        return matchSearch && matchGenre && matchFeatures && matchAccessibility && matchPlatform;
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
  }, [games, searchTerm, sortBy, selectedGenres, selectedFeatures, selectedAccessibility, selectedPlatforms]);

  return {
    games: filteredAndSortedGames,

    searchTerm,
    setSearchTerm,

    sortBy,
    setSortBy,

    selectedGenres,
    toggleGenre,

    selectedFeatures,
    toggleFeature,

    selectedAccessibility,
    toggleAccessibility,

    selectedPlatforms,
    togglePlatform,

    clearFilters,
  };
}
