import { ReactNode } from "react";

import { cn } from "@/lib/utils/shadcn";

interface SectionProps {
  children: ReactNode;
  className?: string;
  childClassName?: string;
}

export function SectionRoot({ children, className, childClassName }: SectionProps) {
  return (
    <section className={className}>
      <div className={cn("mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", childClassName)}>{children}</div>
    </section>
  );
}
