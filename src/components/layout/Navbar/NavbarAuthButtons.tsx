import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

interface NavbarAuthButtonsProps {
  variant?: "desktop" | "mobile";
}

export function NavbarAuthButtons({ variant = "desktop" }: NavbarAuthButtonsProps) {
  const isMobile = variant === "mobile";
  const t = useTranslations("Navbar.auth");

  return (
    <div className={isMobile ? "flex flex-col gap-2" : "ml-2 hidden gap-2 lg:flex"}>
      <Button asChild variant="outline" className={isMobile ? "w-full" : ""}>
        <Link href="/login">{t("login")}</Link>
      </Button>

      <Button asChild className={isMobile ? "w-full" : ""}>
        <Link href="/register">{t("register")}</Link>
      </Button>
    </div>
  );
}
