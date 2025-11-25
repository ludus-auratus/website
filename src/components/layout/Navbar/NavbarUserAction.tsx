"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarUserActionProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export function NavbarUserAction({ setIsLoggedIn }: NavbarUserActionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations("Navbar");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="hidden lg:flex">
        <Button
          variant="ghost"
          className="ring-primary/20 relative h-9 w-9 cursor-pointer rounded-full transition-all hover:ring-2"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt={t("avatar_alt", { name: "João Silva" })} />
            <AvatarFallback className="bg-primary text-primary-foreground font-ludus-pixelify-sans">JS</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="ring-primary/20 relative ml-2 h-9 w-9 cursor-pointer rounded-full transition-all hover:ring-2"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src="" alt={t("avatar_alt", { name: "João Silva" })} />
              <AvatarFallback className="bg-primary text-primary-foreground font-ludus-pixelify-sans">
                JS
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex items-center gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-ludus-pixelify-sans font-medium">João Silva</p>
              <p className="text-muted-foreground truncate text-sm">joao.silva@email.com</p>
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex cursor-pointer items-center">
              <User className="hover:text-accent mr-2 h-4 w-4" aria-hidden="true" /> {t("user_menu.my_profile")}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex cursor-pointer items-center">
              <LayoutDashboard className="hover:text-accent mr-2 h-4 w-4" aria-hidden="true" />{" "}
              {t("user_menu.dev_portal")}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex cursor-pointer items-center">
              <Settings className="hover:text-accent mr-2 h-4 w-4" aria-hidden="true" /> {t("user_menu.settings")}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setIsLoggedIn(false)}
            className="text-destructive active:bg-destructive/20 active:text-destructive focus:bg-destructive/10 focus:text-destructive flex cursor-pointer items-center"
          >
            <LogOut className="text-destructive mr-2 h-4 w-4" aria-hidden="true" /> {t("user_menu.logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
