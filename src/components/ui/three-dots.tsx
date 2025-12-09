import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils/shadcn";

const variants = cva("bg-foreground h-1 w-1 animate-bounce rounded-full", {
  variants: {
    fill: {
      true: "bg-foreground",
      false: "bg-transparent border-1 border-foreground",
    },
  },
  defaultVariants: {
    fill: false,
  },
});

export function ThreeDots({ className, fill = false }: { className?: string; fill?: boolean }) {
  return (
    <div className={cn("flex gap-1", className)}>
      <div className={cn(variants({ fill }))} />
      <div className={cn(variants({ fill }), "delay-200")} />
      <div className={cn(variants({ fill }), "delay-400")} />
    </div>
  );
}
