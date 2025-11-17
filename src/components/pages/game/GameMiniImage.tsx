import Image from "next/image";

import { GameImage } from "@/lib/game";
import { createPlaceholderImageUrl } from "@/lib/utils/image.utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  image?: GameImage;
};

const defaultImage: GameImage = {
  type: "image",
  title: "Missing image",
  src: createPlaceholderImageUrl(160, 90, "Missing Image"),
  alt: "",
};

export default function GameMiniImage(props: Props) {
  const { onClick } = props;

  const image = props.image ?? defaultImage;
  const { src, alt } = image;

  return (
    <button
      onClick={onClick}
      className="border-ludus-green-100 aspect-video overflow-clip rounded-md border-1 shadow-md shadow-black/50"
    >
      <Image src={src} width={160} height={90} alt={alt ?? ""} className="size-full" />
    </button>
  );
}
