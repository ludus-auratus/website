"use client";

import { useCallback, useMemo } from "react";
import { Control, Controller, FieldErrors, useWatch } from "react-hook-form";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import { Separator } from "@/components/ui/separator";
import { Language, LanguageSupport } from "@/lib/game";

import { GamePublishFormData } from "./schema";

interface LanguagesSectionProps {
  control: Control<GamePublishFormData>;
  errors: FieldErrors<GamePublishFormData>;
  languages: Language[];
}

interface LanguageCardProps {
  language: MultiSelectOption;
  support: LanguageSupport;
  onSupportChange: (field: keyof Omit<LanguageSupport, "languageId">, value: boolean) => void;
}

function LanguageCard({ language, support, onSupportChange }: LanguageCardProps) {
  const supportOptions = [
    { key: "interface" as const, label: "Interface traduzida" },
    { key: "subtitles" as const, label: "Legenda traduzida" },
    { key: "voiceover" as const, label: "Dublagem disponível" },
  ];

  return (
    <Card className="bg-muted/30 border-border rounded-2xl p-4">
      <h5 className="font-ludus-pixelify-sans text-sm">{language.name}</h5>

      <div className="space-y-3">
        {supportOptions.map(({ key, label }) => (
          <div key={key} className="flex items-center space-x-2">
            <Checkbox
              id={`${support.languageId}-${key}`}
              checked={support[key]}
              onCheckedChange={(checked) => onSupportChange(key, checked as boolean)}
            />
            <label htmlFor={`${support.languageId}-${key}`} className="cursor-pointer text-sm">
              {label}
            </label>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function LanguagesSection({ control, errors, languages }: LanguagesSectionProps) {
  const languageOptions: MultiSelectOption[] = languages.map((lang) => ({
    id: lang.id,
    name: lang.name,
  }));

  const watchedLanguages = useWatch({ control, name: "languages" });
  const currentLanguages = useMemo(() => watchedLanguages || [], [watchedLanguages]);

  const createLanguageSupport = useCallback(
    (languageIds: string[]): LanguageSupport[] => {
      const existingSupport = new Map(currentLanguages.map((ls) => [ls.languageId, ls]));

      return languageIds.map((languageId) => {
        const existing = existingSupport.get(languageId);
        return (
          existing || {
            languageId,
            interface: false,
            subtitles: false,
            voiceover: false,
          }
        );
      });
    },
    [currentLanguages],
  );

  const handleLanguageChange = useCallback(
    (selectedIds: string[], onChange: (value: LanguageSupport[]) => void) => {
      const newSupport = createLanguageSupport(selectedIds);
      onChange(newSupport);
    },
    [createLanguageSupport],
  );

  const handleSupportUpdate = useCallback(
    (
      languageId: string,
      field: keyof Omit<LanguageSupport, "languageId">,
      value: boolean,
      onChange: (value: LanguageSupport[]) => void,
    ) => {
      const updated = currentLanguages.map((ls) => (ls.languageId === languageId ? { ...ls, [field]: value } : ls));
      onChange(updated);
    },
    [currentLanguages],
  );

  return (
    <Card className="bg-card border-border rounded-3xl p-8">
      <div className="space-y-6">
        <h3 className="font-ludus-pixelify-sans text-accent mb-6 flex items-center gap-2 font-semibold">
          Idiomas Suportados
        </h3>

        <div className="space-y-2">
          <Label>
            Selecione os Idiomas <span className="text-destructive">*</span>
          </Label>

          <Controller
            name="languages"
            control={control}
            render={({ field }) => (
              <MultiSelect
                ref={field.ref}
                error={errors.languages?.message}
                options={languageOptions}
                selected={field.value?.map((ls) => ls.languageId) || []}
                onChange={(langs) => handleLanguageChange(langs, field.onChange)}
                placeholder="Selecione os idiomas disponíveis"
                maxCount={5}
              />
            )}
          />
          {errors.languages && <p className="text-destructive text-sm">{errors.languages.message}</p>}
        </div>

        {currentLanguages.length > 0 && (
          <div className="space-y-4">
            <Separator />

            <h4 className="text-muted-foreground font-ludus-pixelify-sans text-sm">
              Configure o suporte para cada idioma:
            </h4>

            <Controller
              name="languages"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {currentLanguages.map((ls) => {
                    const language = languageOptions.find((lang) => lang.id === ls.languageId);
                    if (!language) return null;

                    return (
                      <LanguageCard
                        key={ls.languageId}
                        language={language}
                        support={ls}
                        onSupportChange={(supportField, value) =>
                          handleSupportUpdate(ls.languageId, supportField, value, field.onChange)
                        }
                      />
                    );
                  })}
                </div>
              )}
            />
          </div>
        )}
      </div>
    </Card>
  );
}
