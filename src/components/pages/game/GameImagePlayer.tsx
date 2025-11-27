import Image from "next/image";

import { GameImage } from "@/lib/game";
import { createPlaceholderImageUrl } from "@/lib/utils/image.utils";

type Props = {
  image?: GameImage;
};

const defaultImage: GameImage = {
  type: "image",
  title: "Missing image",
  src: createPlaceholderImageUrl(160, 90, "Missing Image"),
  alt: "Missing image",
};

export default function GameImagePlayer(props: Props) {
  const { src, alt } = props.image ?? defaultImage;

  return (
    <div className="border-ludus-green-700 relative overflow-clip rounded-md border-1 shadow-md shadow-black/50">
      <Image src={src} width={160} height={90} alt={alt ?? ""} className="h-full w-full object-cover object-center" />
    </div>
  );
}
