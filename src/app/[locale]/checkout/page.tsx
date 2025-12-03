"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, Check, CheckCircle2, Copy, Loader2, Lock, QrCode } from "lucide-react";

import qrCode from "@/assets/images/qrcode.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/game";

export default function Checkout() {
  // const t = useTranslations("Checkout");
  const router = useRouter();
  const { items, getCartTotal, getGamesCount, clearCart } = useCart();
  const { addPurchase, isAuthenticated } = useAuth();

  const [pixGenerated, setPixGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const itemsPurchase = useRef(items).current;
  const subtotal = useRef(getCartTotal());
  const total = useRef(subtotal.current).current;
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

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    } else if (getGamesCount() === 0) {
      router.push("/cart");
    }
  }, [getGamesCount, isAuthenticated, router]);

  const handleGeneratePix = () => {
    setPixGenerated(true);
  };

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixCode.current);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  const handleConfirmPayment = () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      addPurchase({ items: itemsPurchase, total, status: "completed" });
      router.push("/profile/my-library");

      setTimeout(() => clearCart(), 1000);
    });
  };

  // Se o PIX foi gerado, mostra a tela de pagamento
  if (pixGenerated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 md:py-12">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground absolute -top-12 left-0 flex items-center gap-2 hover:bg-transparent"
            onClick={() => setPixGenerated(false)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card className="bg-card/50 border-border/50 border backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="font-ludus-pixelify-sans flex items-center justify-center gap-2 text-2xl">
                <QrCode className="text-primary h-6 w-6" />
                Pague com PIX
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="border-border/50 relative h-64 w-64 rounded-lg border-4 bg-white p-6">
                  <Image src={qrCode} fill alt="QR Code" className="absolute" />
                </div>
              </div>

              <div className="bg-primary/5 border-primary/20 space-y-2 rounded-lg border p-4">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <AlertCircle className="text-primary h-4 w-4" />
                  Como pagar:
                </p>
                <ol className="text-muted-foreground ml-6 list-inside list-decimal space-y-1 text-sm">
                  <li>Abra o app do seu banco</li>
                  <li>Escolha pagar via PIX</li>
                  <li>Escaneie o QR Code ou copie o código</li>
                  <li>Confirme o pagamento</li>
                </ol>
              </div>

              <div className="space-y-2">
                <Label>Código PIX Copia e Cola:</Label>
                <div className="flex gap-2">
                  <div className="bg-muted flex-1 rounded-lg p-3 font-mono text-xs break-all">{pixCode.current}</div>
                  <Button variant="outline" size="icon" onClick={handleCopyPix} className="shrink-0">
                    {copied ? <Check className="text-highlight h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-1 py-4 text-center">
                <p className="text-muted-foreground text-sm">Valor a pagar</p>
                <p className="text-4xl font-bold">{formatPrice(total)}</p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
                  <div className="flex gap-3">
                    <div className="mt-0.5 h-5 w-5 flex-shrink-0 animate-pulse rounded-full bg-blue-500" />
                    <div className="text-sm">
                      <p className="mb-1 font-semibold text-blue-500">Aguardando pagamento...</p>
                      <p className="text-muted-foreground">
                        Após o pagamento, seu pedido será confirmado automaticamente em até 1 minuto.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleConfirmPayment}
                  variant="accent"
                  disabled={isPending}
                  className="h-12 w-full"
                  size="lg"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Confirmando...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Simular Pagamento Confirmado
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Tela inicial de checkout
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 md:py-12">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground absolute -top-12 left-0 flex items-center gap-2 hover:bg-transparent"
          asChild
        >
          <Link href="/cart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao carrinho
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Formulário de Checkout */}
        <div className="lg:col-span-2">
          <h1 className="font-ludus-pixelify-sans mb-6 text-3xl md:text-4xl">Finalizar Compra</h1>

          <div className="space-y-6">
            {/* Método de Pagamento */}
            <Card className="bg-card/50 border-border/50 border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Método de Pagamento</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="bg-primary/5 border-primary/20 rounded-lg border-2 p-6 text-center">
                  <QrCode className="text-primary mx-auto mb-4 h-16 w-16" />
                  <h3 className="font-ludus-pixelify-sans mb-2 text-xl">Pagamento via PIX</h3>
                  <p className="text-muted-foreground mb-4 text-sm">Aprovação instantânea e 100% seguro</p>
                  <div className="text-muted-foreground flex items-center justify-center gap-2 text-xs">
                    <Lock className="h-3 w-3" />
                    <span>Transação criptografada</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Resumo do Pedido */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <h2 className="font-ludus-pixelify-sans mb-4 text-2xl">Resumo do Pedido</h2>

            <Card className="bg-card/50 border-border/50 border backdrop-blur-sm">
              <CardContent className="space-y-4 p-6">
                {/* Items */}
                <div className="max-h-64 space-y-3 overflow-y-auto">
                  {itemsPurchase.map((item) => (
                    <div key={item.id} className="space-y-2">
                      <div className="flex items-start gap-3">
                        {item.icon && (
                          <Image
                            src={item.icon}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="h-12 w-12 rounded object-cover"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{item.name}</p>
                          <p className="text-muted-foreground text-xs">{item.studio}</p>
                          <div className="mt-1 flex items-center justify-between">
                            <span className="text-muted-foreground text-xs">Qtd: {item.quantity}</span>
                            <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Subtotal ({totalItems} {totalItems === 1 ? "item" : "itens"})
                    </span>
                    <span>{formatPrice(subtotal.current)}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-ludus-pixelify-sans text-lg">Total</span>
                    <span className="font-ludus-pixelify-sans text-2xl">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button size="lg" className="w-full" onClick={handleGeneratePix}>
                  <QrCode className="mr-2 h-5 w-5" />
                  Gerar Código PIX
                </Button>

                <div className="bg-primary/5 mt-4 flex items-center gap-2 rounded-lg p-3">
                  <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
                  <p className="text-muted-foreground text-xs">
                    Ao confirmar, você será redirecionado para a tela de pagamento PIX
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
