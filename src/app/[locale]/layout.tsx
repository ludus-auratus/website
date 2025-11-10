import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";

import { routing } from "@/i18n/routing";
import { fontBorn2bSporty, fontPixelify, fontPoppins } from "@/lib/fonts";
import { cn } from "@/lib/utils/shadcn";

import "@/assets/styles/globals.css";

export const metadata: Metadata = {
  title: "Iniciando o projeto",
  description: "Iniciando o projeto",
};

const localeToLang: Record<string, string> = {
  en: "en",
  pt: "pt-BR",
};

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

  const fonts = cn(fontPoppins.variable, fontPixelify.variable, fontBorn2bSporty.variable);
  const lang = localeToLang[locale] || locale;

  return (
    <html lang={lang}>
      <body className={cn(fonts, "dark flex h-screen flex-col")}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
