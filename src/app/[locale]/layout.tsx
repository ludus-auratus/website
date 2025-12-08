import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";

import { Toaster } from "@/components/ui/sonner";
import { VLibras } from "@/components/ui/vlibras";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { routing } from "@/i18n/routing";
import { fontBorn2bSporty, fontPixelify, fontPoppins } from "@/lib/fonts";
import { cn } from "@/lib/utils/shadcn";

import "@/assets/styles/globals.css";

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

  const fonts = cn(fontPoppins.variable, fontPixelify.variable, fontBorn2bSporty.variable);

  return (
    <html suppressHydrationWarning lang={locale}>
      <body className={cn(fonts, "dark flex h-full min-h-screen flex-col scroll-smooth")}>
        <AuthProvider>
          <CartProvider>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </CartProvider>
        </AuthProvider>

        <Toaster />
        <VLibras />
        <Script src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js" defer />
      </body>
    </html>
  );
}
