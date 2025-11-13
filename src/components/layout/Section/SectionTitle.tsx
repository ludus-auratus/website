import { ReactNode } from "react";

import { cn } from "@/lib/utils/shadcn";

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return <div className={cn("flex items-center justify-center space-x-3", className)}>{children}</div>;
}
