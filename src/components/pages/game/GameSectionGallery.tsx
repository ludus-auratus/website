"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { GameImage, GameMedia, GameVideo } from "@/lib/game";
import { createPlaceholderImageUrl } from "@/lib/utils/image.utils";

import GameImagePlayer from "./GameImagePlayer";
import GameMiniImage from "./GameMiniImage";
import GameSection from "./GameSection";
import GameVideoPlayer from "./GameVideoPlayer";

type Props = {
  gallery?: GameMedia[];
};

const defaultMedia: GameImage = {
  type: "image",
  title: "Missing image",
  src: createPlaceholderImageUrl(160, 90, "Missing Image"),
  alt: "Missing image",
};

export default function GameSectionGallery(props: Props) {
  const gallery = props.gallery ?? [];

  const [mediaIndex, setMediaIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const media = gallery[mediaIndex] ?? defaultMedia;

  const leftArrowDisabled = mediaIndex === 0;
  const rightArrowDisabled = mediaIndex === gallery.length - 1;

  useEffect(() => {
    if (!api) return;

    const currentIndex = api.selectedScrollSnap();

    if (currentIndex !== mediaIndex) {
      api.scrollTo(mediaIndex, false);
    }
  }, [api, mediaIndex]);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      setMediaIndex(selectedIndex);
    };

    api.on("select", handleSelect);
    handleSelect();

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, setMediaIndex]);

  function handleScreenshotClick(index: number) {
    return () => setMediaIndex(index);
  }

  function handleCarouselPrev() {
    if (mediaIndex > 0) {
      setMediaIndex(mediaIndex - 1);
    }
  }

  function handleCarouselNext() {
    if (mediaIndex < gallery.length - 1) {
      setMediaIndex(mediaIndex + 1);
    }
  }

  return (
    <GameSection bordered="onlyX">
      {media.type === "video" ? (
        <GameVideoPlayer video={media as GameVideo} />
      ) : (
        <GameImagePlayer image={media as GameImage} />
      )}

      <div className="flex items-center justify-between gap-x-6">
        <Button
          disabled={leftArrowDisabled}
          className="font-ludus-pixelify-sans"
          variant="secondary"
          size="icon-lg"
          cursor="pointer"
          hoverAnimation="scale-down"
          onClick={handleCarouselPrev}
        >
          {"<"}
        </Button>

        <div className="bg-ludus-moss-900/50 flex-1 rounded-md">
          <Carousel setApi={setApi} opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent className="md:justify-left -ml-2 w-full gap-x-2 px-4 py-2">
              {gallery.map((media, index) => {
                const src = media.type === "video" ? `https://img.youtube.com/vi/${media.src}/0.jpg` : media.src;

                const image: GameMedia = {
                  type: media.type,
                  title: media.title,
                  src: src,
                  alt: media.alt,
                };

                return (
                  <CarouselItem key={`gallery-${index}`} className="basis-auto pl-2">
                    <GameMiniImage
                      image={image}
                      selected={index === mediaIndex}
                      className="inline-block shrink-0 flex-nowrap"
                      onClick={handleScreenshotClick(index)}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>

        <Button
          disabled={rightArrowDisabled}
          className="font-ludus-pixelify-sans"
          variant="secondary"
          size="icon-lg"
          hoverAnimation="scale-down"
          onClick={handleCarouselNext}
        >
          {">"}
        </Button>
      </div>
    </GameSection>
  );
}
