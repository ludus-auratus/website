import { ReactNode } from "react";

interface SectionContentProps {
  children: ReactNode;
  className?: string;
}

export function SectionContent({ children, className }: SectionContentProps) {
  return <div className={className}>{children}</div>;
}
