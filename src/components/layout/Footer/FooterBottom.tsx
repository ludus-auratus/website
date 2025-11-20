import { useTranslations } from "next-intl";

export function FooterBottom() {
  const t = useTranslations("Footer.Bottom");

  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <p>{t("copyright")}</p>
      </div>

      <p className="text-primary text-center text-sm">{t("slogan")}</p>
    </div>
  );
}
