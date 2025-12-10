"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { SidebarMenuButton } from "@/components/ui/sidebar";

export function SidebarPolicyArticle({
  translationKey,
  translationNamespace,
}: {
  translationKey: string;
  translationNamespace: string;
}) {
  const translation = `${translationNamespace}.${translationKey}`;
  const t = useTranslations(translation);
  return (
    <>
      <SidebarMenuButton asChild>
        <Link href={translation.split(".").slice(2).join("-")}>{t("__title__")}</Link>
      </SidebarMenuButton>
    </>
  );
}
