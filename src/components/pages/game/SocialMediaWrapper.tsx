import Link from "next/link";

import { cn } from "@/lib/utils/shadcn";

export function SocialMediaWrapper({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-[7px] p-[3px] shadow-md shadow-black/25 transition-all",
        "hover:scale-95 hover:opacity-75",
        className,
      )}
    >
      {children}
    </Link>
  );
}
