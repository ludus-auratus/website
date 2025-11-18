import Image from "next/image";
import { cva, VariantProps } from "class-variance-authority";

import { GameMidia } from "@/lib/game";
import { createPlaceholderImageUrl } from "@/lib/utils/image.utils";
import { cn } from "@/lib/utils/shadcn";

const variants = cva(
  cn(
    "border-ludus-green-700 aspect-video cursor-pointer overflow-clip rounded-md border-1 shadow-md shadow-black/50 transition-all",
    "hover:border-ludus-lime-500 hover:scale-95",
  ),
  {
    variants: {
      selected: {
        false: "",
        true: "pointer-events-none border-ludus-lime-500 scale-90",
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

type GameMiniImageProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof variants> & {
    image?: GameMidia;
  };

const defaultImage: GameMidia = {
  type: "image",
  title: "Missing image",
  src: createPlaceholderImageUrl(160, 90, "Missing Image"),
  alt: "",
};

export default function GameMiniImage({
  selected,
  image = defaultImage,
  className,
  onClick,
  ...props
}: GameMiniImageProps) {
  const { src, alt = "" } = image;

  return (
    <button onClick={onClick} className={cn(className, variants({ selected }))} {...props}>
      <Image src={src} width={160} height={90} alt={alt} className="h-full object-cover" />
    </button>
  );
}
