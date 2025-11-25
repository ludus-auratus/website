import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/shadcn";

const variants = cva("text-foreground font-ludus-pixelify-sans text-4xl lg:text-5xl", {
  variants: {
    type: {
      default: "text-white",
      highlight: "text-highlight",
    },
  },
  defaultVariants: {
    type: "default",
  },
});

type SectionTitleTextProps = VariantProps<typeof variants> & {
  text: string;
  className?: string;
};

export function SectionTitleText({ text, className, type }: SectionTitleTextProps) {
  return <h2 className={cn(className, variants({ type }))}>{text}</h2>;
}
