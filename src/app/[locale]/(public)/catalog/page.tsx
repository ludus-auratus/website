import { getTranslations } from "next-intl/server";

import CatalogPageContent from "./CatalogClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.catalog" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function CatalogPage() {
  return <CatalogPageContent />;
}
