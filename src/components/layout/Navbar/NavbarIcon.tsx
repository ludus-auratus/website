import { ElementType } from "react";

import { cn } from "@/lib/utils/shadcn";

interface NavbarIconProps {
  icon: ElementType;
  className?: string;
}

export function NavbarIcon({ icon: Icon, className }: NavbarIconProps) {
  return <Icon aria-hidden="true" className={cn("active:text-primary hover:text-primary h-4 w-4", className)} />;
}
