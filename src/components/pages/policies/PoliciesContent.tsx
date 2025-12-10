"use client";

import Markdown from "react-markdown";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export function PoliciesContent() {
  const t = useTranslations("Policies.map");
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const contentKey = slug?.replaceAll("-", ".");

  return <Markdown>{t(`${contentKey}.__content__`)}</Markdown>;
}
