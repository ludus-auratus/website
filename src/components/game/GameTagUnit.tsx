import { cva, VariantProps } from "class-variance-authority";

const variants = cva(
  [
    "font-ludus-pixelify-sans cursor-default rounded-sm px-2 py-0.5 text-sm shadow-md transition-all",
    "hover:scale-105 hover:outline-1 hover:outline-offset-1",
  ],
  {
    variants: {
      color: {
        greenLight: "bg-ludus-green-600",
        greenDark: "bg-ludus-green-700",
      },
    },
    defaultVariants: {
      color: "greenLight",
    },
  },
);

export type GameTagUnitProps = VariantProps<typeof variants> & {
  text: string;
};

export default function GameTagUnit({ text, color, ...props }: GameTagUnitProps) {
  return (
    <span className={variants({ color })} {...props}>
      {text}
    </span>
  );
}
