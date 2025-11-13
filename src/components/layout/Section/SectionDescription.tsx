import { ReactNode } from "react";

import { cn } from "@/lib/utils/shadcn";

interface SectionDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function SectionDescription({ children, className }: SectionDescriptionProps) {
  return <p className={cn("text-muted-foreground mx-auto max-w-2xl text-lg", className)}>{children}</p>;
}
