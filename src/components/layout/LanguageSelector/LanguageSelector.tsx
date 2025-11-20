"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LanguageSelector() {
  const [supportedLanguages, setSupportedLanguages] = useState(["pt-BR"] as string[]);
  const t = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    let aborted = false;
    fetch("/api/locale")
      .then((res) => res.json())
      .then((data) => !aborted && setSupportedLanguages(data.supported));

    return () => {
      aborted = true;
    };
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{t("trigger")}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {supportedLanguages.map((lang, index) => (
          <DropdownMenuItem key={index} disabled={lang === locale} asChild>
            <Link href={`${lang}/${pathname}`}>{t(lang)}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
