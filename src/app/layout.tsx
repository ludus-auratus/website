import type { Metadata } from "next";

import { fontBorn2bSporty, fontPixelify, fontPoppins } from "@/lib/fonts";
import { cn } from "@/lib/utils/shadcn";

import "@/assets/styles/globals.css";

export const metadata: Metadata = {
  title: "Iniciando o projeto",
  description: "Iniciando o projeto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fonts = cn(fontPoppins.variable, fontPixelify.variable, fontBorn2bSporty.variable);
  return (
    <html lang="pt-BR">
      <body className={fonts}>{children}</body>
    </html>
  );
}
