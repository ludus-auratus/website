import { forwardRef, useImperativeHandle, useRef } from "react";
import Image from "next/image";
import { Image as ImageIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils/shadcn";

interface GalleryImage {
  file: File;
  title: string;
  preview?: string;
}

interface GalleryImagesUploadProps {
  images: GalleryImage[];
  onChange: (images: GalleryImage[]) => void;
  error?: string;
  itemErrors?: Record<number, { title?: { message?: string } }>;
}

export interface GalleryImagesUploadHandle {
  focus: () => void;
}

export const GalleryImagesUpload = forwardRef<GalleryImagesUploadHandle, GalleryImagesUploadProps>(
  ({ images, onChange, error, itemErrors }: GalleryImagesUploadProps, ref) => {
    const labelRef = useRef<HTMLLabelElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        labelRef.current?.focus();
      },
    }));

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files) return;

      if (images.length + files.length > 5) {
        toast.error("Você pode adicionar no máximo 5 imagens na galeria");
        return;
      }

      const newImages: GalleryImage[] = [];

      Array.from(files).forEach((file) => {
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} não é uma imagem válida`);
          return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
          newImages.push({
            file,
            title: "",
            preview: reader.result as string,
          });

          // Quando todas as imagens forem processadas
          if (newImages.length === files.length) {
            onChange([...images, ...newImages]);
          }
        };

        reader.readAsDataURL(file);
      });
    };

    const handleRemove = (index: number) => {
      const newImages = images.filter((_, i) => i !== index);
      onChange(newImages);
    };

    const handleTitleChange = (index: number, title: string) => {
      const newImages = images.map((img, i) => (i === index ? { ...img, title } : img));
      onChange(newImages);
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="text-primary h-5 w-5" />
            <Label>
              Galeria de Imagens (máx. 5) <span className="text-destructive">*</span>
            </Label>
          </div>
          <span className="text-muted-foreground text-sm">{images.length}/5</span>
        </div>

        {images.length < 5 && (
          <div
            className={cn(
              "border-border hover:border-primary rounded-2xl border-2 border-dashed p-6 text-center transition-colors",
              error && "border-destructive/50 hover:border-destructive",
            )}
          >
            <input
              type="file"
              id="gallery-upload"
              multiple
              aria-invalid={!!error}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <label
              aria-invalid={!!error}
              ref={labelRef}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  document.getElementById("gallery-upload")?.click();
                }
              }}
              htmlFor="gallery-upload"
              className={
                "focus-visible:ring-ring flex cursor-pointer flex-col items-center gap-2 rounded-lg p-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              }
            >
              <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                <ImageIcon className="text-primary h-6 w-6" />
              </div>
              <p className="font-ludus-pixelify-sans text-primary">Clique para adicionar imagens</p>
              <p className="text-muted-foreground text-sm">PNG, JPG ou WEBP até 5MB cada</p>
            </label>
          </div>
        )}

        {images.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {images.map((image, index) => {
              const itemError = itemErrors?.[index]?.title?.message;

              return (
                <Card key={index} className="bg-muted/30 border-border rounded-2xl p-4">
                  <div className="space-y-3">
                    <div className="bg-muted relative aspect-video overflow-hidden rounded-xl">
                      <Image
                        src={image.preview || URL.createObjectURL(image.file)}
                        alt={image.title}
                        className="h-full w-full object-cover"
                        fill
                      />

                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={() => handleRemove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center gap-1">
                        <Label htmlFor={`title-${index}`} className="text-xs">
                          Título da imagem <span className="text-destructive">*</span>
                        </Label>
                      </div>
                      <Input
                        id={`title-${index}`}
                        placeholder="Título da imagem"
                        value={image.title}
                        aria-invalid={!!itemError}
                        onChange={(e) => handleTitleChange(index, e.target.value)}
                      />
                      {itemError && <p className="text-destructive mt-1 text-xs">{itemError}</p>}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {error && <p className="text-destructive text-sm">{error}</p>}
      </div>
    );
  },
);

GalleryImagesUpload.displayName = "GalleryImagesUpload";
