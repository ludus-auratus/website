import { ReactNode } from "react";

interface FooterRootProps {
  children: ReactNode;
}

export function FooterRoot({ children }: FooterRootProps) {
  return (
    <footer className="bg-card border-border border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">{children}</div>
    </footer>
  );
}
