import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Iniciando o projeto",
  description: "Iniciando o projeto",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
