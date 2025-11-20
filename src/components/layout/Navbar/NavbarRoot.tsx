import { ReactNode } from "react";

interface NavbarRootProps {
  children: ReactNode;
}

export function NavbarRoot({ children }: NavbarRootProps) {
  return (
    <nav
      aria-label="Menu principal"
      className="bg-background/95 border-border sticky top-0 z-50 border-b backdrop-blur-sm"
    >
      <div className="mx-auto h-15 max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </nav>
  );
}
