import { useTranslations } from "next-intl";
import { Filter, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function CatalogSidebar() {
  const t = useTranslations("Catalog.sidebar");

  const genres = [
    "Todos",
    "Ação",
    "Aventura",
    "RPG",
    "Estratégia",
    "Simulação",
    "Música",
    "Luta",
    "Plataforma",
    "outros",
  ];
  const popularTags = ["Multiplayer", "Singleplayer", "Offline", "Ação", "Aventura", "RPG", "Estratégia", "Casual"];
  const platforms = ["PC", "PlayStation", "Xbox", "Switch", "Mobile"];

  return (
    <aside className="space-y-6 lg:col-span-1">
      <Card className="bg-card/50 flex flex-row items-center justify-between p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Filter className="text-primary h-5 w-5" />
          <h3 className="font-ludus-pixelify-sans text-lg">{t("filters_title")}</h3>
        </div>

        <Button variant="ghost" size="sm">
          <RefreshCcw className="mr-1 h-3 w-3" />
          {t("clear_all")}
        </Button>
      </Card>

      <div className="flex flex-row flex-wrap gap-6 lg:flex-col">
        <Card className="bg-card/50 border-border min-w-[200px] flex-1 p-6 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="font-ludus-pixelify-sans text-md">{t("popular_tags")}</Label>

              <div className="space-y-2">
                {popularTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox id={`tag-${tag}`} />
                    <Label htmlFor={`tag-${tag}`} className="cursor-pointer text-sm">
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 border-border min-w-[200px] flex-1 p-6 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="font-ludus-pixelify-sans text-md">{t("genres")}</Label>

              <div className="space-y-2">
                {genres.map((genre) => (
                  <div key={genre} className="flex items-center space-x-2">
                    <Checkbox id={`genre-${genre}`} />
                    <Label htmlFor={`genre-${genre}`} className="cursor-pointer text-sm">
                      {genre}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 border-border min-w-[200px] flex-1 p-6 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="font-ludus-pixelify-sans text-md">{t("platforms")}</Label>

              <div className="space-y-2">
                {platforms.map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <Checkbox id={`platform-${platform}`} />
                    <Label htmlFor={`platform-${platform}`} className="cursor-pointer text-sm">
                      {platform}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </aside>
  );
}
