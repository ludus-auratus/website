import { ReactNode } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/shadcn";

const navbarMenuItemVariants = cva(
  "text-foreground flex cursor-pointer items-center gap-2 rounded-md transition-all duration-300 outline-none focus-visible:ring-2 font-ludus-pixelify-sans",
  {
    variants: {
      variant: {
        desktop: "active:text-primary active:bg-primary/10 hover:text-primary focus-visible:ring-ring/85 px-3 py-2 ",
        mobile:
          "hover:bg-primary/10 active:text-primary active:bg-primary/10 hover:text-primary focus-visible:ring-primary  p-2 ",
      },
    },
    defaultVariants: {
      variant: "desktop",
    },
  },
);

interface NavbarMenuItemProps extends VariantProps<typeof navbarMenuItemVariants> {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}

export function NavbarMenuItem({ href, children, onClick, variant }: NavbarMenuItemProps) {
  return (
    <li>
      <Link href={href} onClick={onClick} className={cn(navbarMenuItemVariants({ variant }))}>
        {children}
      </Link>
    </li>
  );
}
