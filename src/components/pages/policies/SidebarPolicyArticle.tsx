import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { SidebarMenuButton, SidebarMenuSubItem } from "@/components/ui/sidebar";

export async function SidebarPolicyArticle({
  translationKey,
  translationNamespace,
}: {
  translationKey: string;
  translationNamespace: string;
}) {
  const translation = `${translationNamespace}.${translationKey}`;
  const t = await getTranslations(translation);
  return (
    <SidebarMenuSubItem>
      <SidebarMenuButton asChild>
        <Link href={translation.split(".").slice(1).join("-")}>{t("__title__")}</Link>
      </SidebarMenuButton>
    </SidebarMenuSubItem>
  );
}
