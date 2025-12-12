"use client";

import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { signUp } from "@/lib/auth";

interface NavbarAuthButtonsProps {
  variant?: "desktop" | "mobile";
}

export function NavbarAuthButtons({ variant = "desktop" }: NavbarAuthButtonsProps) {
  const isMobile = variant === "mobile";
  const t = useTranslations("Navbar.auth");

  return (
    <div className={isMobile ? "flex flex-col gap-2" : "ml-2 hidden gap-2 lg:flex"}>
      <Button onClick={() => signIn()} variant="outline" className={isMobile ? "w-full" : ""}>
        {t("login")}
      </Button>

      <Button onClick={() => signUp()} className={isMobile ? "w-full" : ""}>
        {t("register")}
      </Button>
    </div>
  );
}
