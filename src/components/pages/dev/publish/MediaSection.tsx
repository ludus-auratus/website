import { Control, Controller, FieldErrors } from "react-hook-form";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { BannerImageUpload } from "./BannerImageUpload";
import { CoverImageUpload } from "./CoverImageUpload";
import { GalleryImagesUpload } from "./GalleryImagesUpload";
import { GameFileUpload } from "./GameFileUpload";
import { GamePublishFormData } from "./schema";
import { TrailerUpload } from "./TrailerUpload";

interface MediaSectionProps {
  control: Control<GamePublishFormData>;
  errors: FieldErrors<GamePublishFormData>;
}

export function MediaSection({ control, errors }: MediaSectionProps) {
  return (
    <Card className="bg-card border-border rounded-3xl p-8">
      <div className="space-y-8">
        <h3 className="font-ludus-pixelify-sans text-accent mb-6 flex items-center gap-2 font-semibold">
          Mídias do Jogo
        </h3>

        {/* Capa do Jogo */}
        <Controller
          name="coverImage"
          control={control}
          render={({ field }) => (
            <CoverImageUpload
              ref={field.ref}
              value={field.value}
              onChange={field.onChange}
              error={errors.coverImage?.message}
            />
          )}
        />

        <Separator />

        {/* Banner do Jogo */}
        <Controller
          name="bannerImage"
          control={control}
          render={({ field }) => (
            <BannerImageUpload
              ref={field.ref}
              value={field.value}
              onChange={field.onChange}
              error={errors.bannerImage?.message}
            />
          )}
        />

        <Separator />

        {/* Galeria de Imagens */}
        <Controller
          name="galleryImages"
          control={control}
          render={({ field }) => (
            <GalleryImagesUpload
              ref={field.ref}
              images={field.value}
              onChange={field.onChange}
              error={errors.galleryImages?.message}
              itemErrors={errors.galleryImages as unknown as Record<number, { title?: { message?: string } }>}
            />
          )}
        />

        <Separator />

        {/* Trailer */}
        <Controller
          name="trailer.url"
          control={control}
          render={({ field: urlField }) => (
            <Controller
              name="trailer.title"
              control={control}
              render={({ field: titleField }) => (
                <TrailerUpload
                  ref={urlField.ref}
                  url={urlField.value || ""}
                  title={titleField.value || ""}
                  onUrlChange={urlField.onChange}
                  onTitleChange={titleField.onChange}
                  urlError={errors.trailer?.url?.message}
                  titleError={errors.trailer?.title?.message}
                />
              )}
            />
          )}
        />

        <Separator />

        {/* Arquivo do Jogo */}
        <Controller
          name="gameFile"
          control={control}
          render={({ field }) => (
            <GameFileUpload
              ref={field.ref}
              file={field.value}
              onChange={field.onChange}
              error={errors.gameFile?.message}
            />
          )}
        />
      </div>
    </Card>
  );
}
