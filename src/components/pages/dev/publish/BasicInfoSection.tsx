import { Control, Controller, FieldErrors } from "react-hook-form";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { GamePublishFormData } from "./schema";

interface BasicInfoSectionProps {
  control: Control<GamePublishFormData>;
  errors: FieldErrors<GamePublishFormData>;
}

const ratingOptions = [
  { value: "0", label: "Livre" },
  { value: "10", label: "10 anos" },
  { value: "12", label: "12 anos" },
  { value: "14", label: "14 anos" },
  { value: "16", label: "16 anos" },
  { value: "18", label: "18 anos" },
];

export function BasicInfoSection({ control, errors }: BasicInfoSectionProps) {
  const handlePriceFormat = (value: string) => {
    const numericValue = value.replace(/[^\d,]/g, "");
    return numericValue;
  };

  const formatPriceDisplay = (value: string) => {
    if (!value) return "";
    const numValue = parseFloat(value.replace(",", "."));
    if (isNaN(numValue)) return "";
    return `R$ ${numValue.toFixed(2).replace(".", ",")}`;
  };

  return (
    <Card className="bg-card border-border rounded-3xl p-8">
      <div className="space-y-6">
        <h3 className="font-ludus-pixelify-sans text-accent mb-6 flex items-center gap-2 font-semibold">
          Informações Básicas
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="gameName">
              Nome do Jogo <span className="text-destructive">*</span>
            </Label>

            <Controller
              name="gameName"
              control={control}
              render={({ field }) => (
                <Input aria-invalid={!!errors.gameName} {...field} id="gameName" placeholder="Ex: Lendas do Sertão" />
              )}
            />

            {errors.gameName && <p className="text-destructive text-sm">{errors.gameName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="version">
              Versão <span className="text-destructive">*</span>
            </Label>
            <Controller
              name="version"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  aria-invalid={!!errors.version}
                  id="version"
                  placeholder="Ex: 1.0.0"
                  className="bg-input-background w-full"
                />
              )}
            />
            {errors.version && <p className="text-destructive text-sm">{errors.version.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Preço (R$)</Label>

            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <div className="space-y-1">
                  <Input
                    {...field}
                    aria-invalid={!!errors.price}
                    id="price"
                    placeholder="Ex: 49,90"
                    onChange={(e) => field.onChange(handlePriceFormat(e.target.value))}
                  />
                  {field.value && <p className="text-muted-foreground text-sm">{formatPriceDisplay(field.value)}</p>}
                </div>
              )}
            />
            {errors.price && <p className="text-destructive text-sm">{errors.price.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">
              Classificação Indicativa <span className="text-destructive">*</span>
            </Label>

            <Controller
              name="ageRating"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="ageRating"
                    size="default"
                    aria-invalid={!!errors.ageRating}
                    className="bg-input-background w-full"
                  >
                    <SelectValue placeholder="Selecione a classificação" />
                  </SelectTrigger>

                  <SelectContent>
                    {ratingOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.ageRating && <p className="text-destructive text-sm">{errors.ageRating.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Data de Lançamento</Label>
            <Controller
              name="releaseDate"
              control={control}
              render={({ field }) => (
                <Input
                  aria-invalid={!!errors.releaseDate}
                  type="date"
                  id="releaseDate"
                  onChange={(e) => field.onChange(e.target.valueAsDate)}
                  className="bg-input-background input-date w-full"
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional">Informações Adicionais</Label>
            <Controller
              name="additional"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="additional"
                  placeholder="Ex: DLC, Edição Especial..."
                  className="bg-input-background w-full"
                />
              )}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
