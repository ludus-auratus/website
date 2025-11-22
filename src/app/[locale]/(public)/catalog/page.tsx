"use client";

import { useState } from "react";

import games from "@/assets/data/games.json";
import { Catalog } from "@/components/pages/catalog";

export default function CatalogPage() {
  const [sortBy, setSortBy] = useState("popular");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

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

      <Catalog.Grid games={games} showFilters={showFilters} />
    </Catalog.Root>
  );
}
