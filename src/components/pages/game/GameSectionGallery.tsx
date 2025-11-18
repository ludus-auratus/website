"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { GameImage, GameMidia, GameVideo } from "@/lib/game";
import { createPlaceholderImageUrl } from "@/lib/utils/image.utils";

import GameImagePlayer from "./GameImagePlayer";
import GameMiniImage from "./GameMiniImage";
import GameSection from "./GameSection";
import GameVideoPlayer from "./GameVideoPlayer";

type Props = {
  gallery?: GameMidia[];
};

const defaultMidia: GameImage = {
  type: "image",
  title: "Missing image",
  src: createPlaceholderImageUrl(160, 90, "Missing Image"),
  alt: "Missing image",
};

export default function GameSectionGallery(props: Props) {
  const gallery = props.gallery ?? [];

  const [midiaIndex, setMediaIndex] = useState(0);
  const midia = gallery[midiaIndex] ?? defaultMidia;

  const leftArrowDisabled = midiaIndex === 0;
  const rightArrowDisabled = midiaIndex === gallery.length - 1;

  function handleScreenshotClick(index: number) {
    return () => setMediaIndex(index);
  }

  return (
    <GameSection bordered="onlyX">
      {midia.type === "video" ? (
        <GameVideoPlayer video={midia as GameVideo} />
      ) : (
        <GameImagePlayer image={midia as GameImage} />
      )}
      <div className="flex items-center justify-between gap-x-6">
        <Button
          disabled={leftArrowDisabled}
          className="font-ludus-pixelify-sans"
          variant="secondary"
          size="icon-lg"
          cursor="pointer"
          hoverAnimation="scale-down"
          onClick={() => setMediaIndex((current) => current - 1)}
        >
          {"<"}
        </Button>
        <div className="bg-ludus-moss-900/50 md:justify-left flex gap-x-2 overflow-x-auto rounded-sm px-4 py-2">
          {gallery.map((midia, index) => {
            const src = midia.type === "video" ? `https://img.youtube.com/vi/${midia.src}/0.jpg` : midia.src;

            const image: GameMidia = {
              type: midia.type,
              title: midia.title,
              src: src,
              alt: midia.alt,
            };

            return (
              <GameMiniImage
                key={`gallery-${index}`}
                image={image}
                selected={index === midiaIndex}
                className="inline-block shrink-0 flex-nowrap"
                onClick={handleScreenshotClick(index)}
              />
            );
          })}
        </div>
        <Button
          disabled={rightArrowDisabled}
          className="font-ludus-pixelify-sans"
          variant="secondary"
          size="icon-lg"
          hoverAnimation="scale-down"
          onClick={() => setMediaIndex((current) => current + 1)}
        >
          {">"}
        </Button>
      </div>
    </GameSection>
  );
}
