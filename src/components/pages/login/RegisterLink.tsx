"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

export function RegisterLink() {
  const t = useTranslations("Auth.login");
  const queryParams = useSearchParams();

  const registerUrl = new URL("/register", window.location.origin);
  if (queryParams.has("callbackUrl")) {
    registerUrl.searchParams.set("callbackUrl", queryParams.get("callbackUrl")!);
  }

  return (
    <div className="pt-4 text-center">
      <p className="text-muted-foreground">
        {t("no_account")}{" "}
        <Button asChild variant="link" className="text-primary h-auto p-0 hover:underline">
          <Link href={registerUrl.toString()}>{t("register_link")}</Link>
        </Button>
      </p>
    </div>
  );
}
