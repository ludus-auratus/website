import { useTranslations } from "next-intl";
import { Filter, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tag } from "@/lib/game/game.type";

interface CatalogSidebarProps {
  tags: Tag[];

  selectedGenres: string[];
  toggleGenre: (genre: string) => void;

  selectedFeatures: string[];
  toggleFeature: (feature: string) => void;

  selectedAccessibility: string[];
  toggleAccessibility: (item: string) => void;

  selectedPlatforms: string[];
  togglePlatform: (platform: string) => void;

  clearFilters: () => void;
}

export function CatalogSidebar({
  tags,
  selectedGenres,
  toggleGenre,
  selectedFeatures,
  toggleFeature,
  selectedAccessibility,
  toggleAccessibility,
  selectedPlatforms,
  togglePlatform,
  clearFilters,
}: CatalogSidebarProps) {
  const t = useTranslations("Catalog.sidebar");

  const genres = tags.filter((tag) => tag.type === "genre");
  const platforms = tags.filter((tag) => tag.type === "platform");
  const features = tags.filter((tag) => tag.type === "feature");
  const accessibility = tags.filter((tag) => tag.type === "accessibility");

  return (
    <aside className="space-y-6">
      <Card className="bg-card/50 flex flex-row items-center justify-between p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Filter className="text-primary h-5 w-5" />
          <h3 className="font-ludus-pixelify-sans text-lg">{t("filters_title")}</h3>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-accent/20 active:bg-accent/30 hover:text-foreground"
              onClick={clearFilters}
            >
              <RefreshCcw className="mr-1 h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("clear_all")}</p>
          </TooltipContent>
        </Tooltip>
      </Card>

      <div className="flex flex-row flex-wrap gap-6 lg:flex-col">
        {genres.length > 0 && (
          <Card className="bg-card/50 border-border min-w-[200px] flex-1 p-6 backdrop-blur-sm">
            <div className="space-y-3">
              <Label className="font-ludus-pixelify-sans text-md">{t("genres")}</Label>

              <div className="space-y-2">
                {genres.map((genre) => (
                  <div key={genre.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`genre-${genre.id}`}
                      checked={selectedGenres.includes(genre.name)}
                      onCheckedChange={() => toggleGenre(genre.name)}
                    />
                    <Label htmlFor={`genre-${genre.id}`} className="cursor-pointer text-sm">
                      {genre.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {platforms.length > 0 && (
          <Card className="bg-card/50 border-border min-w-[200px] flex-1 p-6 backdrop-blur-sm">
            <div className="space-y-3">
              <Label className="font-ludus-pixelify-sans text-md">{t("platforms")}</Label>

              <div className="space-y-2">
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`platform-${platform.id}`}
                      checked={selectedPlatforms.includes(platform.name)}
                      onCheckedChange={() => togglePlatform(platform.name)}
                    />
                    <Label htmlFor={`platform-${platform.id}`} className="cursor-pointer text-sm">
                      {platform.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {features.length > 0 && (
          <Card className="bg-card/50 border-border min-w-[200px] flex-1 p-6 backdrop-blur-sm">
            <div className="space-y-3">
              <Label className="font-ludus-pixelify-sans text-md">{t("features")}</Label>

              <div className="space-y-2">
                {features.map((tag) => (
                  <div key={tag.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag.id}`}
                      checked={selectedFeatures.includes(tag.name)}
                      onCheckedChange={() => toggleFeature(tag.name)}
                    />
                    <Label htmlFor={`tag-${tag.id}`} className="cursor-pointer text-sm">
                      {tag.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {accessibility.length > 0 && (
          <Card className="bg-card/50 border-border min-w-[200px] flex-1 p-6 backdrop-blur-sm">
            <div className="space-y-3">
              <Label className="font-ludus-pixelify-sans text-md">{t("accessibility")}</Label>

              <div className="space-y-2">
                {accessibility.map((tag) => (
                  <div key={tag.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag.id}`}
                      checked={selectedAccessibility.includes(tag.name)}
                      onCheckedChange={() => toggleAccessibility(tag.name)}
                    />
                    <Label htmlFor={`tag-${tag.id}`} className="cursor-pointer text-sm">
                      {tag.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </aside>
  );
}
