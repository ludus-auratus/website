import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { ContactForm } from "@/components/forms/ContactForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.contact" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ContactPage() {
  const t = useTranslations("Contact");

  return (
    <div className="flex w-full items-center justify-center px-4 py-8 sm:px-8 md:py-12">
      <Card className="bg-card/95 w-full max-w-2xl shadow-2xl backdrop-blur-sm">
        <CardHeader className="pb-6 text-center">
          <CardTitle className="font-ludus-pixelify-sans text-3xl">{t("title")}</CardTitle>
          <CardDescription className="text-muted-foreground text-lg">{t("description")}</CardDescription>
        </CardHeader>

        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  );
}
