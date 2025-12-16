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
            <Library className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">{t("library")}</span>
          </Link>
        </TabsTrigger>

        <TabsTrigger value="purchases" asChild>
          <Link href="/profile/purchases">
            <ShoppingBag className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">{t("purchases")}</span>
          </Link>
        </TabsTrigger>

        <TabsTrigger value="wishlist" className="" asChild>
          <Link href="/profile/wishlist" className="">
            <Heart className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">{t("wishlist")}</span>
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
