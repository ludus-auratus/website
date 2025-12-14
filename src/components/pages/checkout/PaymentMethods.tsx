import { useTranslations } from "next-intl";
import { Lock, QrCode } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PaymentMethods() {
  const t = useTranslations("Checkout");
  return (
    <div className="space-y-8">
      <Card className="bg-card/50 border-border/50 border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl">{t("payment_method")}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="bg-primary/5 border-primary/20 rounded-lg border-2 p-6 text-center">
            <QrCode className="text-primary mx-auto mb-4 h-16 w-16" />
            <h3 className="font-ludus-pixelify-sans mb-2 text-xl">{t("pix.title")}</h3>
            <p className="text-muted-foreground mb-4 text-sm">{t("pix.description")}</p>
            <div className="text-muted-foreground flex items-center justify-center gap-2 text-xs">
              <Lock className="h-3 w-3" />
              <span>{t("pix.secure_transaction")}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
