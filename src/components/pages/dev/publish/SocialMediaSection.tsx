import { Control, Controller, FieldErrors, useFieldArray, UseFormTrigger, useWatch } from "react-hook-form";
import { AiOutlineDiscord, AiOutlineFacebook, AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { GamePublishFormData } from "./schema";

interface SocialMediaSectionProps {
  control: Control<GamePublishFormData>;
  errors: FieldErrors<GamePublishFormData>;
  trigger: UseFormTrigger<GamePublishFormData>;
}

const socialMediaOptions = [
  { value: "0", label: "Facebook", icon: AiOutlineFacebook, color: "text-primary" },
  { value: "1", label: "Instagram", icon: AiOutlineInstagram, color: "text-primary" },
  { value: "2", label: "X (Twitter)", icon: FaXTwitter, color: "text-primary" },
  { value: "3", label: "Discord", icon: AiOutlineDiscord, color: "text-primary" },
  { value: "4", label: "YouTube", icon: AiOutlineYoutube, color: "text-primary" },
];

export function SocialMediaSection({ control, errors, trigger }: SocialMediaSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialMedias",
  });

  const watchedSocialMedias = useWatch({
    control,
    name: "socialMedias",
  });

  const availablePlatforms = socialMediaOptions.length;
  const usedPlatformsCount = fields.length;
  const isAllPlatformsSelected = usedPlatformsCount >= availablePlatforms;

  const getNextAvailablePlatform = () => {
    return (socialMediaOptions.find((option) => !watchedSocialMedias?.some((s) => s.platform === option.value))
      ?.value || "0") as "0" | "1" | "2" | "3" | "4";
  };

  return (
    <Card className="bg-card border-border rounded-3xl p-8">
      <div className="space-y-6">
        <h3 className="font-ludus-pixelify-sans text-accent mb-6 flex items-center gap-2 font-semibold">
          Redes Sociais
        </h3>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-background/50 border-border group hover:border-primary/50 relative flex flex-col gap-4 rounded-xl border p-4 transition-all md:flex-row md:items-start"
            >
              <div className="flex-1 space-y-2">
                <Label className="text-muted-foreground text-xs font-semibold uppercase">Plataforma</Label>
                <Controller
                  control={control}
                  name={`socialMedias.${index}.platform`}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        trigger(`socialMedias.${index}.url`);
                      }}
                    >
                      <SelectTrigger className="bg-background xs:w-auto h-10 w-full">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {socialMediaOptions.map((option) => {
                          const isSelected = watchedSocialMedias?.some(
                            (item, idx) => item.platform === option.value && idx !== index,
                          );

                          return (
                            <SelectItem key={option.value} value={option.value} disabled={isSelected}>
                              <div className="flex items-center gap-2">
                                <option.icon className={`h-4 w-4 ${option.color}`} />
                                <span>{option.label}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex-[2] space-y-2">
                <Label className="text-muted-foreground text-xs font-semibold uppercase">URL do Perfil</Label>

                <div className="relative">
                  <Controller
                    control={control}
                    name={`socialMedias.${index}.url`}
                    render={({ field }) => (
                      <Input {...field} placeholder="https://..." aria-invalid={!!errors.socialMedias?.[index]?.url} />
                    )}
                  />
                </div>

                {errors.socialMedias?.[index]?.url && (
                  <p className="text-destructive text-sm">{errors.socialMedias[index]?.url?.message}</p>
                )}
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="bg-background text-muted-foreground hover:bg-destructive hover:text-destructive-foreground absolute -top-2 -right-2 h-8 w-8 rounded-full border opacity-0 shadow-sm transition-opacity group-hover:opacity-100 md:static md:mt-6 md:h-10 md:w-10 md:rounded-md md:border-none md:bg-transparent md:opacity-100 md:shadow-none"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {fields.length === 0 && (
            <div className="border-border text-muted-foreground flex flex-col items-center justify-center rounded-xl border border-dashed py-8 text-center">
              <p className="mb-2 text-sm">Nenhuma rede social adicionada</p>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  return append({ platform: getNextAvailablePlatform(), url: "" });
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Adicionar Primeira Rede
              </Button>
            </div>
          )}

          {fields.length > 0 && !isAllPlatformsSelected && (
            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed"
              onClick={() => append({ platform: getNextAvailablePlatform(), url: "" })}
            >
              <Plus className="mr-2 h-4 w-4" /> Adicionar Outra Rede Social
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
