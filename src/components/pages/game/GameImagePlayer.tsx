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
    <div>
      <Image src={src} alt={alt ?? ""} fill className="object-cover" />
    </div>
  );
}
