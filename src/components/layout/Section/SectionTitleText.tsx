import { cn } from "@/lib/utils/shadcn";

interface SectionTitleTextProps {
  text: string;
  className?: string;
}

export function SectionTitleText({ text, className }: SectionTitleTextProps) {
  return <h2 className={cn("text-foreground font-ludus-pixelify-sans text-4xl lg:text-5xl", className)}>{text}</h2>;
}
