import { getTranslations } from "next-intl/server";

import CartPageContent from "./CartClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.cart" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function CartPage() {
  return <CartPageContent />;
}
