import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { FileQuestion, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

import "@/assets/styles/globals.css";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="bg-background relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4 text-center">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Radial Gradient overlay */}
      <div className="from-background via-background/50 absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--tw-gradient-to)_100%)] to-transparent" />

      <div className="relative z-10 mb-8">
        <div className="bg-primary/20 absolute inset-0 animate-pulse rounded-full blur-3xl" />
        <div className="relative">
          <FileQuestion className="text-primary h-32 w-32 animate-bounce" />
          <div className="bg-primary/20 absolute -bottom-4 left-1/2 h-4 w-24 -translate-x-1/2 rounded-[100%] blur-sm" />
        </div>
      </div>

      <div className="relative z-10 space-y-2">
        <h1 className="font-ludus-pixelify-sans from-primary to-highlight animate-in fade-in zoom-in-50 bg-gradient-to-r bg-clip-text text-9xl font-bold text-transparent duration-1000">
          {t("code")}
        </h1>

        <h2 className="bloc font-ludus-pixelify-sans animate-in slide-in-from-bottom-4 mb-6 text-3xl font-medium tracking-tight delay-300 duration-1000 md:text-5xl">
          {t("title")}
        </h2>

        <p className="text-muted-foreground animate-in slide-in-from-bottom-4 mb-8 max-w-2xl text-lg delay-500 duration-1000">
          {t("description")}
        </p>

        <Button asChild size="lg" className="group animate-in fade-in zoom-in-95 delay-700 duration-1000">
          <Link href="/">
            <Home className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            {t("back_button")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
