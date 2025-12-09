import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function DevModalButton({
  icon,
  text,
  href,
  children,
  disabled = false,
  variants = "outline",
}: {
  icon: LucideIcon;
  text: string;
  href?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  variants?: "outline" | "ghost" | "link" | "default" | "destructive" | "secondary" | "accent";
}) {
  const Icon = icon;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant={variants} className="flex-grow md:flex-none" asChild={!!href} disabled={disabled}>
          {href ? (
            <Link href="#">
              <Icon className="h-4 w-4" />
              <span>{text}</span>
            </Link>
          ) : (
            <>
              <Icon className="h-4 w-4" />
              <span>{text}</span>
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
