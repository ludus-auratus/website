"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { FormattedMarkdown } from "@/components/ui/formatted-markdown";

export function PoliciesContent() {
  const t = useTranslations("Policies.map");
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const contentKey = slug?.replaceAll("-", ".");

  return <FormattedMarkdown>{t(`${contentKey}.__content__`)}</FormattedMarkdown>;
}
