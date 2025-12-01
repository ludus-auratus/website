"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Library, Search, ShoppingBag, X } from "lucide-react";

import { GameCardLibrary } from "@/components/game/GameCardLibrary";
import { Button } from "@/components/ui/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";

export default function MyLibraryPage() {
  const t = useTranslations("Profile");
  const [searchTerm, setSearchTerm] = useState("");
  const { library } = useAuth();

  const filteredGames = library.filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Tabs defaultValue="my-library" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="my-library" asChild>
          <Link href="/profile/my-library">
            <Library className="mr-2 h-4 w-4" />
            {t("tabs.library")}
          </Link>
        </TabsTrigger>

        <TabsTrigger value="purchases" asChild>
          <Link href="/profile/purchases">
            <ShoppingBag className="mr-2 h-4 w-4" />
            {t("tabs.purchases")}
          </Link>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="my-library" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-foreground font-ludus-pixelify-sans xs:block hidden text-2xl font-bold">
            {t("library.title")}
          </h2>

          <div className="xs:flex-none relative ml-auto flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />

            <Input
              placeholder={t("library.search_placeholder")}
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
          {library.length === 0 ? (
            <div className="col-span-full">
              <EmptyState>
                <EmptyStateIcon icon={Library} />
                <EmptyStateTitle>{t("library.empty.title")}</EmptyStateTitle>
                <EmptyStateDescription>{t("library.empty.description")}</EmptyStateDescription>
                <EmptyStateActions>
                  <Button size="lg" asChild>
                    <Link href="/catalog">{t("library.empty.button")}</Link>
                  </Button>
                </EmptyStateActions>
              </EmptyState>
            </div>
          ) : filteredGames.length === 0 ? (
            <div className="col-span-full">
              <EmptyState>
                <EmptyStateIcon icon={Search} />
                <EmptyStateTitle>{t("library.no_results.title")}</EmptyStateTitle>
                <EmptyStateDescription>{t("library.no_results.description", { searchTerm })}</EmptyStateDescription>
                <EmptyStateActions>
                  <Button onClick={() => setSearchTerm("")}>{t("library.clear_search")}</Button>
                </EmptyStateActions>
              </EmptyState>
            </div>
          ) : (
            filteredGames.map((game) => (
              <GameCardLibrary key={game.id} id={game.id} name={game.name} icon={game.icon} rating={game.rating} />
            ))
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
