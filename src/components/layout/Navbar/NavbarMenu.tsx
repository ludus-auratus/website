import { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/shadcn";

const navbarMenuVariants = cva("list-none transition-all duration-200", {
  variants: {
    variant: {
      desktop: "hidden lg:flex items-center space-x-6",
      mobile: "lg:hidden rounded-lg border p-4 shadow-lg bg-card border-border mt-2 mb-4 space-y-2",
    },
    open: {
      true: "block",
      false: "hidden",
    },
  },
  compoundVariants: [
    {
      variant: "desktop",
      open: false,
      class: "lg:flex",
    },
  ],
  defaultVariants: {
    variant: "desktop",
    open: false,
  },
});

interface NavbarMenuProps extends VariantProps<typeof navbarMenuVariants> {
  children: ReactNode;
  id?: string;
}

export function NavbarMenu({ children, variant, open, id }: NavbarMenuProps) {
  return (
    <ul id={id} className={cn(navbarMenuVariants({ variant, open }))}>
      {children}
    </ul>
  );
}
