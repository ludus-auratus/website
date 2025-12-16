import { getTranslations } from "next-intl/server";

import { getUserWishlist } from "@/lib/wishlist/wishlist.api";

import WishlistPageContent from "./WishlistClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.wishlist" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function WishlistPage() {
  const initialGames = await getUserWishlist(1);

  return (
    <>
      <WishlistPageContent initialGames={initialGames} />
    </>
  );
}
