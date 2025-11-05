import type { Metadata } from "next";
import "@/assets/styles/theme.css";
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
  return (
    <html lang="pt-BR">
      <body className="font-ludus-pixelify-sans">{children}</body>
    </html>
  );
}
