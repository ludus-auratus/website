"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function GameDownloadAction() {
  const t = useTranslations("Games");
  const [isPending, startTransition] = useTransition();

  function handleDownload() {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Download concluído!", {
        description: "O jogo foi baixado com sucesso!",
      });
    });
  }

  return (
    <Button className="text-md w-full" variant="accent" disabled={isPending} onClick={handleDownload}>
      {isPending ? (
        <>
          <Loader2 className="size-5 animate-spin" />
          {t("download")}
        </>
      ) : (
        <>
          <Download className="size-5" />
          {t("download")}
        </>
      )}
    </Button>
  );
}
