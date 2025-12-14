import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AlertCircle, ArrowLeft, Check, CheckCircle2, Copy, Loader2, QrCode } from "lucide-react";

import qrCode from "@/assets/images/qrcode.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/game";

interface PixPaymentProps {
  total: number;
  pixCode: string;
  onBack: () => void;
  onConfirm: () => void;
  isPending: boolean;
}

export function PixPayment({ total, pixCode, onBack, onConfirm, isPending }: PixPaymentProps) {
  const t = useTranslations("Checkout");
  const [copied, setCopied] = useState(false);

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 md:py-12">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground flex w-fit items-center justify-start gap-2 hover:bg-transparent"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("pix.back")}
        </Button>
      </div>

      <div className="mx-auto max-w-2xl">
        <Card className="bg-card/50 border-border/50 border backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-ludus-pixelify-sans flex items-center justify-center gap-2 text-2xl">
              <QrCode className="text-primary h-6 w-6" />
              {t("pix.subtitle")}
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
                {t("pix.how_to_pay")}
              </p>
              <ol className="text-muted-foreground ml-6 list-inside list-decimal space-y-1 text-sm">
                <li>{t("pix.step_1")}</li>
                <li>{t("pix.step_2")}</li>
                <li>{t("pix.step_3")}</li>
                <li>{t("pix.step_4")}</li>
              </ol>
            </div>

            <div className="space-y-2">
              <Label>{t("pix.copy_paste")}</Label>
              <div className="flex gap-2">
                <div className="bg-muted flex-1 rounded-lg p-3 font-mono text-xs break-all">{pixCode}</div>
                <Button variant="outline" size="icon" onClick={handleCopyPix} className="shrink-0">
                  {copied ? <Check className="text-highlight h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-1 py-4 text-center">
              <p className="text-muted-foreground text-sm">{t("pix.amount_to_pay")}</p>
              <p className="text-4xl font-bold">{formatPrice(total)}</p>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 h-5 w-5 flex-shrink-0 animate-pulse rounded-full bg-blue-500" />
                  <div className="text-sm">
                    <p className="mb-1 font-semibold text-blue-500">{t("pix.waiting")}</p>
                    <p className="text-muted-foreground">{t("pix.confirmation_info")}</p>
                  </div>
                </div>
              </div>

              <Button onClick={onConfirm} variant="accent" disabled={isPending} className="h-12 w-full" size="lg">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {t("pix.confirming")}
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    {t("pix.simulate")}
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
