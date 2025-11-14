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
    return () => {
      setMediaIndex(() => index);
    };
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
          className="bg-ludus-yellow-400 hover:bg-ludus-yellow-500 font-ludus-pixelify-sans hidden aspect-square w-12 rounded-md text-white transition-all hover:scale-95 md:block"
        >
          &lt;
        </button>
        <div className="bg-ludus-green-900/50 flex w-full gap-x-4 overflow-x-auto rounded-sm px-4 md:justify-center">
          {gallery.map((midia, index) => {
            const key = `gallery-${index}`;
            return midia.type === "image" ? (
              <GameMiniImage key={key} image={midia as GameImage} onClick={handleScreenshotClick(index)} />
            ) : (
              <Image key={key} width={160} height={90} src="https://placehold.co/160x90" alt="Video" />
            );
          })}
        </div>
        <button
          disabled={rightArrowDisabled}
          className="bg-ludus-yellow-400 hover:bg-ludus-yellow-500 font-ludus-pixelify-sans hidden aspect-square w-12 rounded-md text-white transition-all hover:scale-95 md:block"
        >
          &gt;
        </button>
      </div>
    </GameSection>
  );
}
