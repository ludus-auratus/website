"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Heart, Library, ShoppingBag } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProfileTabs() {
  const pathname = usePathname();
  const t = useTranslations("Profile.tabs");

  const getTabValue = () => {
    const segment = pathname.split("/").pop();

    switch (segment) {
      case "wishlist":
      case "purchases":
      case "my-library":
        return segment;
      default:
        return "my-library";
    }
  };

  const currentTab = getTabValue();

  return (
    <Tabs value={currentTab} className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="my-library" asChild>
          <Link href="/profile/my-library">
            <Library className="mr-2 h-4 w-4" />
            {t("library")}
          </Link>
        </TabsTrigger>

        <TabsTrigger value="purchases" asChild>
          <Link href="/profile/purchases">
            <ShoppingBag className="mr-2 h-4 w-4" />
            {t("purchases")}
          </Link>
        </TabsTrigger>

        <TabsTrigger value="wishlist" asChild>
          <Link href="/profile/wishlist">
            <Heart className="mr-2 h-4 w-4" />
            {t("wishlist")}
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
