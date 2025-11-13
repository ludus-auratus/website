import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export function SectionRoot({ children, className }: SectionProps) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
