import { ReactNode } from "react";

interface NavbarActionsProps {
  children: ReactNode;
}
export function NavbarActions({ children }: NavbarActionsProps) {
  return <div className="flex items-center gap-2">{children}</div>;
}
