import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils/shadcn";

interface CoverImageUploadProps {
  value: File | null | undefined;
  onChange: (value: File | null) => void;
  error?: string;
}

export interface CoverImageUploadHandle {
  focus: () => void;
}

export const CoverImageUpload = forwardRef<CoverImageUploadHandle, CoverImageUploadProps>(
  ({ value, onChange, error }: CoverImageUploadProps, ref) => {
    const [preview, setPreview] = useState<string | null>(null);
    const labelRef = useRef<HTMLLabelElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        labelRef.current?.focus();
      },
    }));

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];

      if (!selectedFile) return;

      // Validar se é imagem
      if (!selectedFile.type.startsWith("image/")) return;

      // Criar preview
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);

      onChange(selectedFile);
    };

    const handleRemove = () => {
      setPreview(null);
      onChange(null);
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="text-primary h-5 w-5" />

          <Label>
            Capa do Jogo <span className="text-destructive">*</span>
          </Label>
        </div>
        <p className="text-muted-foreground text-sm">
          Imagem vertical que será exibida nos cards do jogo (proporção 4:4 recomendada)
        </p>

        {!preview ? (
          <div className="max-w-xs">
            <input
              type="file"
              id="cover-upload"
              aria-invalid={!!error}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <label
              ref={labelRef}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  document.getElementById("cover-upload")?.click();
                }
              }}
              htmlFor="cover-upload"
              className={cn(
                "border-border bg-muted/30 hover:border-primary focus-visible:ring-ring flex aspect-[4/4] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                error && "border-destructive/50 hover:border-destructive",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              )}
            >
              <div className="bg-primary/10 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                <ImageIcon className="text-primary h-6 w-6" />
              </div>

              <p className="text-primary font-ludus-pixelify-sans mb-1 text-sm">Clique para adicionar capa</p>
              <p className="text-muted-foreground text-center text-xs">
                PNG, JPG ou WEBP
                <br />
                Proporção 4:4 recomendada
              </p>
            </label>
          </div>
        ) : (
          <div className="max-w-xs space-y-4">
            <Card className="bg-muted/30 border-border rounded-2xl p-4">
              <div className="bg-muted relative mb-3 aspect-[4/4] overflow-hidden rounded-xl">
                <Image src={preview} alt="Capa do jogo" className="h-full w-full object-cover object-center" fill />

                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={handleRemove}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-muted-foreground text-center text-sm">{value?.name || "Capa do Jogo"}</p>
            </Card>
          </div>
        )}

        {error && <p className="text-destructive text-sm">{error}</p>}
      </div>
    );
  },
);

CoverImageUpload.displayName = "CoverImageUpload";
