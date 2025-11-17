"use client";

import { useState } from "react";
import Image from "next/image";

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
        <button
          disabled={leftArrowDisabled}
          className="bg-ludus-yellow-400 disabled:bg-ludus-yellow-700 enabled:hover:bg-ludus-yellow-500 font-ludus-pixelify-sans hidden aspect-square w-12 rounded-md text-white transition-all enabled:hover:scale-95 md:block"
          onClick={() => setMediaIndex((current) => current - 1)}
        >
          &lt;
        </button>
        <div className="bg-ludus-moss-900/50 md:justify-left flex w-full gap-x-4 overflow-x-auto rounded-sm px-4 py-2">
          {gallery.map((midia, index) => {
            const src = midia.type === "video" ? `https://img.youtube.com/vi/${midia.src}/0.jpg` : midia.src;

            const image: GameMidia = {
              type: midia.type,
              title: midia.title,
              src: src,
              alt: midia.alt,
            };

            return <GameMiniImage key={`gallery-${index}`} image={image} onClick={handleScreenshotClick(index)} />;
          })}
        </div>
        <button
          disabled={rightArrowDisabled}
          className="bg-ludus-yellow-400 hover:bg-ludus-yellow-500 font-ludus-pixelify-sans hidden aspect-square w-12 rounded-md text-white transition-all hover:scale-95 md:block"
          onClick={() => setMediaIndex((current) => current + 1)}
        >
          &gt;
        </button>
      </div>
    </GameSection>
  );
}
