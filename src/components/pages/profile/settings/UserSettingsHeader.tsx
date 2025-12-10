"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowLeft, Save, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useUserSettings } from "@/context/UserSettingsContext";

export function UserSettingsHeader() {
  const t = useTranslations("UserSettings");
  const { changed } = useUserSettings();
  return (
    <div className="border-border bg-card/50 border-b">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div className="items-center space-x-4">
            <Button variant="link" size="sm" className="text-foreground hover:text-primary" asChild>
              <Link href={"/profile"}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("back")}
              </Link>
            </Button>
            <div className="flex items-center space-x-3">
              <Settings className="text-primary h-8 w-8" />
              <div>
                <h1 className="text-foreground font-ludus-pixelify-sans text-2xl font-bold lg:text-3xl">
                  {t("title")}
                </h1>
                <p className="text-muted-foreground text-sm">{t("description")}</p>
              </div>
            </div>
          </div>
          {changed && (
            <Button className="bg-[var(--ludus-green-lime)] text-[var(--ludus-green-dark)] hover:bg-[var(--ludus-green-lime)]/90">
              <Save className="mr-2 h-4 w-4" />
              {t("save")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
