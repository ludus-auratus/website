import { ElementType } from "react";

import { cn } from "@/lib/utils/shadcn";

interface NavabarIconProps {
  icon: ElementType;
  className?: string;
}

export function NavabarIcon({ icon: Icon, className }: NavabarIconProps) {
  return <Icon aria-hidden="true" className={cn("active:text-primary hover:text-primary h-4 w-4", className)} />;
}
