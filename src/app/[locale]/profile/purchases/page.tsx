import { getTranslations } from "next-intl/server";

import { getOrders } from "@/lib/order/order.api";

import PurchasesPageContent from "./PurchasesClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.purchases" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PurchasesPage() {
  const initialPurchases = await getOrders(1);

  return <PurchasesPageContent initialPurchases={initialPurchases.dados || []} />;
}
