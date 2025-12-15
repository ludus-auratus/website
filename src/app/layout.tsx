import { fontBorn2bSporty, fontPixelify, fontPoppins } from "@/lib/fonts";
import { cn } from "@/lib/utils/shadcn";

import "@/assets/styles/globals.css";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const fonts = cn(fontPoppins.variable, fontPixelify.variable, fontBorn2bSporty.variable);

  return (
    <html suppressHydrationWarning>
      <body className={cn(fonts, "dark flex h-full min-h-screen flex-col scroll-smooth")}>{children}</body>
    </html>
  );
}
