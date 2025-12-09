import { Control, Controller, FieldErrors } from "react-hook-form";
import { Lightbulb } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Tiptap from "@/components/ui/Tiptap";

import { GamePublishFormData } from "./schema";

interface DescriptionSectionProps {
  control: Control<GamePublishFormData>;
  errors: FieldErrors<GamePublishFormData>;
}

export function DescriptionSection({ control, errors }: DescriptionSectionProps) {
  return (
    <Card className="bg-card border-border rounded-3xl p-8">
      <div className="space-y-6">
        <h3 className="font-ludus-pixelify-sans text-accent mb-6 flex items-center gap-2 font-semibold">
          Descrição do Jogo
        </h3>

        <div className="bg-primary/5 border-primary/20 text-muted-foreground mb-6 rounded-xl border p-4 text-sm">
          <div className="flex items-start gap-3">
            <Lightbulb className="text-primary mt-0.5 h-5 w-5 shrink-0" />
            <div className="space-y-2">
              <p className="text-foreground font-semibold">O que incluir na descrição?</p>
              <ul className="list-disc space-y-1 pl-4">
                <li>
                  <span className="font-semibold">História:</span> Conte um pouco sobre o enredo e o universo do jogo.
                </li>
                <li>
                  <span className="font-semibold">Jogabilidade:</span> Explique como o jogo funciona e suas principais
                  mecânicas.
                </li>
                <li>
                  <span className="font-semibold">Instalação:</span> Instruções de como baixar, instalar e rodar o jogo.
                </li>
                <li>
                  <span className="font-semibold">Requisitos:</span> Informações de hardware mínimo recomendado.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            Descrição Completa <span className="text-destructive">*</span>
          </Label>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <Tiptap
                  ref={field.ref}
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  isInvalid={!!errors.description}
                />
                <div className="flex items-center justify-between text-sm">
                  <p className="text-muted-foreground">{field.value?.replace(/<[^>]*>/g, "").length || 0} caracteres</p>
                  <p className="text-muted-foreground">Mínimo: 100 | Máximo: 5000</p>
                </div>
              </div>
            )}
          />

          {errors.description && <p className="text-destructive text-sm">{errors.description.message}</p>}
        </div>
      </div>
    </Card>
  );
}
