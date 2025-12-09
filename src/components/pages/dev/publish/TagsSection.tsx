import { Control, Controller, type FieldErrors } from "react-hook-form";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { Tag } from "@/lib/game";

import { GamePublishFormData } from "./schema";

interface TagsSectionProps {
  control: Control<GamePublishFormData>;
  errors: FieldErrors<GamePublishFormData>;
  tags: Tag[];
}

export function TagsSection({ control, errors, tags }: TagsSectionProps) {
  const genreTags = tags.filter((tag) => tag.type === "genre");
  const featureTags = tags.filter((tag) => tag.type === "feature");
  const platformTags = tags.filter((tag) => tag.type === "platform");
  const accessibilityTags = tags.filter((tag) => tag.type === "accessibility");

  return (
    <Card className="bg-card border-border rounded-3xl p-8">
      <div className="space-y-6">
        <h3 className="font-ludus-pixelify-sans text-accent mb-6 flex items-center gap-2 font-semibold">
          Tags e Categorias
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>
              Gêneros <span className="text-destructive">*</span>
            </Label>

            <Controller
              name="genres"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  ref={field.ref}
                  options={genreTags}
                  selected={field.value}
                  onChange={field.onChange}
                  error={errors.genres?.message}
                  placeholder="Selecione os gêneros"
                />
              )}
            />

            {errors.genres && <p className="text-destructive text-sm">{errors.genres.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Recursos</Label>

            <Controller
              name="features"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  ref={field.ref}
                  options={featureTags}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Selecione os recursos"
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>
              Plataformas <span className="text-destructive">*</span>
            </Label>

            <Controller
              name="platforms"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  ref={field.ref}
                  options={platformTags}
                  selected={field.value}
                  onChange={field.onChange}
                  error={errors.platforms?.message}
                  placeholder="Selecione as plataformas"
                />
              )}
            />

            {errors.platforms && <p className="text-destructive text-sm">{errors.platforms.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Acessibilidade</Label>

            <Controller
              name="accessibility"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  ref={field.ref}
                  options={accessibilityTags}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Selecione recursos de acessibilidade"
                />
              )}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
