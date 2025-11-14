import { ReactNode } from "react";

interface FooterContentProps {
  children: ReactNode;
}

export function FooterContent({ children }: FooterContentProps) {
  return <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">{children}</div>;
}
