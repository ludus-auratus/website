import Image from "next/image";
import { useTranslations } from "next-intl";

import { FooterSocialMedia } from "./FooterSocialMedia";

export function FooterBrand() {
  const t = useTranslations("Footer");
  return (
    <div className="lg:col-span-2">
      <div className="mb-4">
        <Image src="/images/ludus/logo-texto.svg" width={132} height={41} alt="Logo da Ludus" />
      </div>

      <p className="text-muted-foreground mb-4 max-w-sm text-sm">{t("description")}</p>

      <FooterSocialMedia />
    </div>
  );
}
