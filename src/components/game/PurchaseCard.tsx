import { useState } from "react";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { ChevronDown, ChevronUp, Download, Package } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatPrice } from "@/lib/game";

interface PurchaseItem {
  id: number;
  name: string;
  icon: string;
  price: number;
}

interface PurchaseCardProps {
  orderId: string;
  createdAt: Date;
  status: "paid" | "processing" | "completed";
  items: PurchaseItem[];
  total: number;
}

export function PurchaseCard({ orderId, createdAt, status, items, total }: PurchaseCardProps) {
  const t = useTranslations("PurchaseCard");
  const format = useFormatter();
  const [isExpanded, setIsExpanded] = useState(false);

  const statusConfig = {
    paid: {
      label: t("status.paid"),
      color: "bg-ludus-lime-500/20 text-highlight border border-ludus-lime-500/30",
    },
    processing: {
      label: t("status.processing"),
      color: "bg-ludus-yellow-500/20 text-ludus-yellow-400 border border-ludus-yellow-500/30",
    },
    completed: {
      label: t("status.completed"),
      color: "bg-ludus-green-500/20 text-ludus-green-400 border border-ludus-green-500/30",
    },
  };

  const statusInfo = statusConfig[status];

  return (
    <Card className="gap-0">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <div className="bg-ludus-green-500/20 border-ludus-green-500/30 shrink-0 rounded-lg border p-2">
              <Package className="text-ludus-green-400 h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-foreground truncate text-sm font-semibold sm:text-base">
                {t("order_number", { id: orderId.slice(-8).toUpperCase() })}
              </h3>
              <p className="text-muted-foreground mt-0.5 text-xs sm:text-sm">
                {format.dateTime(createdAt, {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <Badge className="shrink-0">{statusInfo.label}</Badge>
        </div>
      </CardHeader>

      <CardContent className="w-full space-y-3 pt-0 sm:space-y-4">
        <div className="w-full">
          <div className="space-y-2">
            {isExpanded &&
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-ludus-moss-800/40 border-ludus-green-500/10 hover:bg-ludus-moss-800/60 hover:border-ludus-green-500/20 flex items-center gap-2.5 rounded-lg border p-2 transition-colors sm:gap-3 sm:p-2.5"
                >
                  <div className="bg-ludus-moss-900/50 border-ludus-green-500/20 relative h-9 w-9 shrink-0 overflow-hidden rounded border sm:h-10 sm:w-10">
                    <Image src={item.icon} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground text-xs leading-tight font-medium sm:text-sm">{item.name}</p>
                  </div>
                  <span className="text-highlight shrink-0 text-xs font-bold sm:text-sm">
                    {formatPrice(item.price)}
                  </span>
                </div>
              ))}
          </div>

          {items.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-highlight hover:text-ludus-lime-300 group mt-2.5 flex items-center gap-1.5 text-xs font-medium transition-colors sm:text-sm"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 sm:h-4 sm:w-4" />
                  {t("hide_items")}
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5 sm:h-4 sm:w-4" />
                  {t("show_items", { count: items.length })}
                </>
              )}
            </button>
          )}
        </div>

        <div className="border-ludus-green-500/20 border-t pt-3 sm:pt-4">
          <div className="mb-3 flex items-center justify-between sm:mb-4">
            <span className="text-muted-foreground text-sm sm:text-base">{t("total")}</span>
            <span className="text-highlight text-lg font-bold sm:text-xl">{formatPrice(total)}</span>
          </div>

          <div className="xs:flex-row xs:w-fit ml-auto flex h-fit flex-col gap-2">
            {status === "completed" && (
              <Button variant="default" size="sm">
                <Download className="mr-2 h-4 w-4" />
                {t("download")}
              </Button>
            )}
            <Button variant={status === "completed" ? "outline" : "default"} size="sm">
              {t("view_details")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
