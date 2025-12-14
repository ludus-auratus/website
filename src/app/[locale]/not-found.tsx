import Link from "next/link";
import { useTranslations } from "next-intl";
import { FileQuestion, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 text-center">
      <div className="relative mb-8">
        <div className="bg-primary/20 absolute inset-0 rounded-full blur-3xl" />
        <FileQuestion className="text-primary relative h-32 w-32 animate-pulse" />
      </div>

      <h1 className="font-ludus-pixelify-sans from-primary to-highlight mb-4 bg-gradient-to-r bg-clip-text text-9xl font-bold text-transparent">
        {t("code")}
      </h1>

      <h2 className="font-ludus-pixelify-sans mb-6 text-3xl md:text-4xl">{t("title")}</h2>

      <p className="text-muted-foreground mb-8 max-w-md text-lg">{t("description")}</p>

      <Button asChild size="lg" className="group">
        <Link href="/">
          <Home className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          {t("back_button")}
        </Link>
      </Button>
    </div>
  );
}
