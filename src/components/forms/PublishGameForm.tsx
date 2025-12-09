"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  BasicInfoSection,
  DescriptionSection,
  GamePublishFormData,
  gamePublishSchema,
  LanguagesSection,
  MediaSection,
  SocialMediaSection,
  TagsSection,
} from "@/components/pages/dev/publish";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Language, publishGame, Tag } from "@/lib/game";
import { zodResolver } from "@hookform/resolvers/zod";

interface PublishGameFormProps {
  initialTags: Tag[];
  initialLanguages: Language[];
}

export function PublishGameForm({ initialTags, initialLanguages }: PublishGameFormProps) {
  const router = useRouter();
  const [tags] = useState<Tag[]>(initialTags);
  const [languages] = useState<Language[]>(initialLanguages);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<GamePublishFormData>({
    resolver: zodResolver(gamePublishSchema),
    defaultValues: {
      gameName: "",
      version: "1.0.0",
      price: "",
      ageRating: "",
      genres: [],
      features: [],
      platforms: [],
      accessibility: [],
      languages: [],
      galleryImages: [],
      description: "",
      trailer: {
        url: "",
        title: "",
      },
      coverImage: null,
      bannerImage: null,
      socialMedias: [],
      additional: "",
    },
  });

  const onSubmit = async (data: GamePublishFormData) => {
    try {
      const formData = new FormData();

      formData.append("Titulo", data.gameName);
      formData.append("IdDesenvolvedor", "1");
      formData.append("Descricao", data.description);
      formData.append("Preco", (data.price || 0).toString());
      formData.append("Versao", data.version);
      formData.append("Arquivo", data.gameFile);

      if (data.additional) {
        formData.append("Adicional", data.additional);
      }

      if (data.releaseDate) {
        formData.append("DataLancamento", data.releaseDate.toISOString());
      }

      if (data.coverImage) {
        formData.append("ArquivoIcone", data.coverImage);
      }

      if (data.bannerImage) {
        formData.append("ArquivoBanner", data.bannerImage);
      }

      const selectedTags = tags
        .filter(
          (tag) =>
            data.genres.includes(tag.id) ||
            data.features.includes(tag.id) ||
            data.platforms.includes(tag.id) ||
            data.accessibility.includes(tag.id),
        )
        .map((tag) => tag.id);

      selectedTags.forEach((id) => {
        formData.append("TagIds", id.toString());
      });

      data.languages.forEach((lang, index) => {
        formData.append(`Traducoes[${index}].IdIdioma`, lang.languageId);
        formData.append(`Traducoes[${index}].TemInterface`, lang.interface.toString());
        formData.append(`Traducoes[${index}].TemAudio`, lang.voiceover.toString());
        formData.append(`Traducoes[${index}].TemLegenda`, lang.subtitles.toString());
      });

      interface MediaSubmissionItem {
        title: string;
        type: "image" | "video";
        source?: File | string;
      }

      const mediaItems: MediaSubmissionItem[] = [];

      data.galleryImages.forEach((img) => {
        mediaItems.push({
          title: img.title,
          type: "image",
          source: img.file,
        });
      });

      if (data.trailer?.url && data.trailer?.title) {
        mediaItems.push({
          title: data.trailer.title,
          type: "video",
          source: data.trailer.url,
        });
      }

      mediaItems.forEach((item, index) => {
        formData.append(`Midias[${index}].Titulo`, item.title);
        formData.append(`Midias[${index}].Tipo`, item.type === "image" ? "0" : "1");

        if (item.source instanceof File) {
          formData.append(`Midias[${index}].ArquivoImagem`, item.source);
          formData.append(`Midias[${index}].Url`, "");
        } else {
          formData.append(`Midias[${index}].Url`, item.source as string);
          formData.append(`Midias[${index}].ArquivoImagem`, "");
        }
      });

      if (data.socialMedias) {
        data.socialMedias.forEach((social, index) => {
          formData.append(`RedesSociais[${index}].Plataforma`, social.platform);
          formData.append(`RedesSociais[${index}].Url`, social.url);
        });
      }

      const response = await publishGame(formData);
      console.log(response);

      toast.success("Jogo publicado com sucesso! ");
      router.push("/dev/dashboard");
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Erro ao publicar jogo";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <BasicInfoSection control={control} errors={errors} />
      <DescriptionSection control={control} errors={errors} />
      <TagsSection control={control} errors={errors} tags={tags} />
      <LanguagesSection control={control} errors={errors} languages={languages} />
      <MediaSection control={control} errors={errors} />
      <SocialMediaSection control={control} errors={errors} trigger={trigger} />

      <Card className="border-highlight/20 rounded-3xl bg-gradient-to-r from-[#548443]/10 via-[#71E256]/10 to-[#E8B739]/10 p-8">
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button type="button" variant="outline" disabled={isSubmitting}>
            Cancelar
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Publicando..." : "Publicar Jogo"}
          </Button>
        </div>
      </Card>
    </form>
  );
}
