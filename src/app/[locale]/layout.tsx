import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { ClientProviders } from "@/components/layout/Providers/ClientProviders";
import { ServerProviders } from "@/components/layout/Providers/ServerProviders";
import { Toaster } from "@/components/ui/sonner";
import { VLibras } from "@/components/ui/vlibras";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.home" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <>
      <ServerProviders>
        <ClientProviders>{children}</ClientProviders>
      </ServerProviders>

      <Toaster />
      <VLibras />
      <Script src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js" defer />
    </>
  );
}
