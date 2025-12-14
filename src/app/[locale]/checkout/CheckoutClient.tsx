"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { OrderSummary } from "@/components/pages/checkout/OrderSummary";
import { PaymentMethods } from "@/components/pages/checkout/PaymentMethods";
import { PixPayment } from "@/components/pages/checkout/PixPayment";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/lib/order/order.api";

export default function CheckoutPageContent() {
  const t = useTranslations("Checkout");
  const router = useRouter();
  const { items, getCartTotal, getGamesCount, clearCart } = useCart();
  // const { isAuthenticated } = useAuth();

  const [pixGenerated, setPixGenerated] = useState(false);
  const [isPending, startTransition] = useTransition();

  const itemsPurchase = useRef(items).current;
  const subtotalRef = useRef(getCartTotal());
  const total = useRef(subtotalRef.current).current;
  const totalItems = useRef(getGamesCount()).current;

  // Gera código PIX fictício
  const pixCode = useRef(
    "00020126580014br.gov.bcb.pix0136" +
      Math.random().toString(36).substring(2, 38) +
      "520400005303986540" +
      total.toFixed(2).replace(".", "") +
      "5802BR5925LUDUS GAME STORE6009SAO PAULO62070503***6304" +
      Math.random().toString(36).substring(2, 6).toUpperCase(),
  );

  const handleGeneratePix = () => {
    setPixGenerated(true);
  };

  const handleConfirmPayment = () => {
    startTransition(async () => {
      try {
        const dto = {
          usuarioId: 1,
          jogoIds: itemsPurchase.map((item) => item.id),
        };

        await createOrder(dto);
        toast.success(t("success_message"));

        // Limpa o carrinho
        clearCart();

        // Redireciona para a biblioteca (que agora buscará do back-end)
        router.replace("/profile/my-library");
      } catch (error) {
        console.error("Erro ao realizar pedido:", error);
        toast.error(t("error_message"));
      }
    });
  };

  // Se o PIX foi gerado, mostra a tela de pagamento
  if (pixGenerated) {
    return (
      <PixPayment
        total={total}
        pixCode={pixCode.current}
        onBack={() => setPixGenerated(false)}
        onConfirm={handleConfirmPayment}
        isPending={isPending}
      />
    );
  }

  // Tela inicial de checkout
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 md:py-12">
      <div className="mb-10">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground flex w-fit items-center justify-start gap-2 hover:bg-transparent"
          asChild
        >
          <Link href="/cart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back_to_cart")}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-20">
        {/* Formulário de Checkout */}
        <div className="lg:col-span-2">
          <h1 className="font-ludus-pixelify-sans mb-10 text-3xl md:text-4xl">{t("finish_purchase")}</h1>

          <div className="space-y-8">
            {/* Método de Pagamento */}
            <PaymentMethods />
          </div>
        </div>

        {/* Resumo do Pedido */}
        <div className="lg:col-span-1">
          <OrderSummary
            items={itemsPurchase}
            subtotal={subtotalRef.current}
            total={total}
            totalItems={totalItems}
            onGeneratePix={handleGeneratePix}
          />
        </div>
      </div>
    </div>
  );
}
