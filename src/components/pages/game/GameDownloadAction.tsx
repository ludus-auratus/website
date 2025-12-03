"use client";

import { useTransition } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function GameDownloadAction() {
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
    <Button className="w-full" variant="accent" disabled={isPending} onClick={handleDownload}>
      {isPending ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <>
          <Download />
          Download
        </>
      )}
    </Button>
  );
}
