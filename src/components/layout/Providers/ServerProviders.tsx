import { NextIntlClientProvider } from "next-intl";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export function ServerProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </CartProvider>
    </AuthProvider>
  );
}
