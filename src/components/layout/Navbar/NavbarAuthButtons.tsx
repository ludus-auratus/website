import Link from "next/link";

import { Button } from "@/components/ui/button";

interface NavbarAuthButtonsProps {
  variant?: "desktop" | "mobile";
}

export function NavbarAuthButtons({ variant = "desktop" }: NavbarAuthButtonsProps) {
  const isMobile = variant === "mobile";

  return (
    <div className={isMobile ? "flex flex-col gap-2" : "hidden gap-2 lg:flex"}>
      <Button asChild variant="outline" className={isMobile ? "w-full" : ""}>
        <Link href="/login">Entrar</Link>
      </Button>

      <Button asChild className={isMobile ? "w-full" : ""}>
        <Link href="/registro">Registre-se</Link>
      </Button>
    </div>
  );
}
