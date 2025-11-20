import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";

export function FooterBottom() {
  const t = useTranslations("Footer.Bottom");

  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <span>{t("copyright1")}</span>
        <Heart className="h-4 w-4 fill-current text-red-500" />
        <span>{t("copyright2")}</span>
      </div>

      <p className="text-primary text-center text-sm">{t("slogan")}</p>
    </div>
  );
}
