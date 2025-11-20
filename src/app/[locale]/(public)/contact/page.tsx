import { useTranslations } from "next-intl";

import { ContactForm } from "@/components/forms/ContactForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Contact() {
  const t = useTranslations("Contact");

  return (
    <div className="flex w-full items-center justify-center px-4 py-8 sm:px-8 md:py-12">
      <Card className="w-full max-w-2xl">
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
