import { ElementType } from "react";

import { cn } from "@/lib/utils/shadcn";

interface SectionIconProps {
  icon: ElementType;
  className?: string;
}

export function SectionIcon({ icon: Icon, className }: SectionIconProps) {
  return <Icon className={cn("text-accent h-8 w-8", className)} />;
}
