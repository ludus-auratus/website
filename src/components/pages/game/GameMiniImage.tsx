import Image from "next/image";

import { GameMidia } from "@/lib/game";
import { createPlaceholderImageUrl } from "@/lib/utils/image.utils";

type GameMiniImageProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  image?: GameMidia;
};

const defaultImage: GameMidia = {
  type: "image",
  title: "Missing image",
  src: createPlaceholderImageUrl(160, 90, "Missing Image"),
  alt: "",
};

export default function GameMiniImage(props: GameMiniImageProps) {
  const { onClick } = props;

  const image = props.image ?? defaultImage;
  const { src, alt = "" } = image;

  return (
    <button
      onClick={onClick}
      className="border-ludus-green-700 hover:border-ludus-lime-500 aspect-video cursor-pointer overflow-clip rounded-md border-1 shadow-md shadow-black/50 transition-all hover:scale-95"
    >
      <Image src={src} width={160} height={90} alt={alt} className="h-full object-cover" />
    </button>
  );
}
