import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import iconLudos from "@/assets/images/ludus/icon.png";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.wip" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function WipPage() {
  const t = useTranslations("Wip");

  return (
    <div className="flex size-full flex-col items-center justify-center px-4 py-8 sm:px-8 md:py-12">
      <Image src={iconLudos} alt="Ícone do Ludus" width={160} height={160} unoptimized />

      <h3 className="font-ludus-pixelify-sans text-center text-4xl">{t("title")}</h3>
      <p className="font-ludus-poppins">{t("paragraph")}</p>

      <Button asChild>
        <Link href={"/"} className="font-ludus-pixelify-sans mt-4">
          {t("back_to_home")}
        </Link>
      </Button>
    </div>
  );
}
