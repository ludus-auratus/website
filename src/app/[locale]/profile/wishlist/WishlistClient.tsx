"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Heart, Search, X } from "lucide-react";

import { GameList } from "@/components/game/GameList";
import { Button } from "@/components/ui/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

export default function WishlistPageContent() {
  const t = useTranslations("Profile");
  const { favorites } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGames = favorites.filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="xs:flex-row xs:justify-between flex flex-col items-center justify-center gap-2">
        <h2 className="text-foreground font-ludus-pixelify-sans xs:block text-2xl font-bold">{t("wishlist.title")}</h2>

        <div className="xs:flex-none xs:ml-auto relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />

          <Input
            placeholder={t("wishlist.search_placeholder")}
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

      {favorites.length === 0 ? (
        <div className="col-span-full">
          <EmptyState>
            <EmptyStateIcon icon={Heart} />
            <EmptyStateTitle>{t("wishlist.empty.title")}</EmptyStateTitle>
            <EmptyStateDescription>{t("wishlist.empty.description")}</EmptyStateDescription>
            <EmptyStateActions>
              <Button size="lg" asChild>
                <Link href="/catalog">{t("wishlist.empty.button")}</Link>
              </Button>
            </EmptyStateActions>
          </EmptyState>
        </div>
      ) : filteredGames.length === 0 ? (
        <div className="col-span-full">
          <EmptyState>
            <EmptyStateIcon icon={Search} />
            <EmptyStateTitle>{t("wishlist.no_results.title")}</EmptyStateTitle>
            <EmptyStateDescription>{t("wishlist.no_results.description", { searchTerm })}</EmptyStateDescription>
            <EmptyStateActions>
              <Button onClick={() => setSearchTerm("")}>{t("wishlist.clear_search")}</Button>
            </EmptyStateActions>
          </EmptyState>
        </div>
      ) : (
        <GameList games={filteredGames} variant="store" />
      )}
    </div>
  );
}
