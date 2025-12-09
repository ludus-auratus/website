import Link from "next/link";

import { cn } from "@/lib/utils/shadcn";

export function SocialMediaWrapper({
  href,
  className = "",
  children,
  disabled = false,
}: {
  href: string;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}) {
  if (disabled) {
    return (
      <div
        className={cn(
          "rounded-[7px] p-[3px] shadow-sm shadow-black/10 transition-all",
          "bg-secondary cursor-not-allowed opacity-50 grayscale",
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <Link
      href={href}
      target="_blank"
      className={cn(
        "rounded-[7px] p-[3px] shadow-md shadow-black/25 transition-all will-change-transform",
        "hover:scale-95 hover:opacity-75",
        className,
      )}
    >
      {children}
    </Link>
  );
}
