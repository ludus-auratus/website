import { ReactNode } from "react";

import { cn } from "@/lib/utils/shadcn";

interface SectionHeaderProps {
  children: ReactNode;
  className?: string;
}

export function SectionHeader({ children, className }: SectionHeaderProps) {
  return <div className={cn("mb-12 space-y-4 text-center", className)}>{children}</div>;
}
