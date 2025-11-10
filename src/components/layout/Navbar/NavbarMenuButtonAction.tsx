import { LuMenu, LuX } from "react-icons/lu";

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
      className="border-none lg:hidden"
    >
      {isOpen ? <LuX className="size-5" aria-hidden="true" /> : <LuMenu className="size-5" aria-hidden="true" />}
    </Button>
  );
}
