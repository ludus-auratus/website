"use client";

import { type ChangeEvent, forwardRef, useImperativeHandle, useRef } from "react";
import { CheckCircle2, FileArchive, Trash2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils/shadcn";

interface GameFileUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

export interface GameFileUploadHandle {
  focus: () => void;
}

export const GameFileUpload = forwardRef<GameFileUploadHandle, GameFileUploadProps>(
  ({ file, onChange, error }: GameFileUploadProps, ref) => {
    const labelRef = useRef<HTMLLabelElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        labelRef.current?.focus();
      },
    }));

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];

      if (!selectedFile) return;

      const validExtensions = [".zip", ".exe"];
      const fileExtension = selectedFile.name.toLowerCase().slice(selectedFile.name.lastIndexOf("."));

      if (!validExtensions.includes(fileExtension)) {
        return;
      }

      onChange(selectedFile);
    };

    const handleRemove = () => {
      onChange(null);
    };

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileArchive className="text-primary h-5 w-5" />

          <Label>
            Arquivo do Jogo <span className="text-destructive">*</span>
          </Label>
        </div>

        <p className="text-muted-foreground text-sm">Envie o arquivo do seu jogo em formato ZIP ou executável (.exe)</p>

        {!file ? (
          <div>
            <input
              type="file"
              id="game-file-upload"
              accept=".zip,.exe,application/zip,application/x-zip-compressed,application/x-msdownload"
              onChange={handleFileChange}
              aria-invalid={!!error}
              className="hidden"
            />

            <label
              ref={labelRef}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  document.getElementById("game-file-upload")?.click();
                }
              }}
              htmlFor="game-file-upload"
              className={cn(
                "border-border bg-muted/30 hover:border-primary focus-visible:ring-ring flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                error && "border-destructive/50 hover:border-destructive",
              )}
            >
              <div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Upload className="h-8 w-8" />
              </div>
              <p className="font-ludus-pixelify-sans mb-2 text-lg">Clique para enviar o arquivo do jogo</p>
              <p className="text-muted-foreground mb-1 text-sm">Formatos aceitos: ZIP, EXE</p>
              <p className="text-muted-foreground text-xs">Tamanho máximo: 2GB</p>
            </label>
          </div>
        ) : (
          <Card className="bg-muted/30 border-border rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl">
                <CheckCircle2 className="h-6 w-6" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{file.name}</p>
                    <p className="text-muted-foreground text-sm">{formatFileSize(file.size)}</p>
                  </div>

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="flex-shrink-0"
                    onClick={handleRemove}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-green-500">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Arquivo selecionado</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {error && <p className="text-destructive text-sm">{error}</p>}
      </div>
    );
  },
);

GameFileUpload.displayName = "GameFileUpload";
