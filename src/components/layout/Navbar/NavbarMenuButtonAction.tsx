import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface NavbarMenuButtonActionProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function NavbarMenuButtonAction({ isOpen, setIsOpen }: NavbarMenuButtonActionProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      onClick={() => setIsOpen(!isOpen)}
      className="hover:bg-accent/10 active:bg-accent/20 hover:text-foreground relative border-none p-5 lg:hidden"
    >
      {isOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
    </Button>
  );
}
