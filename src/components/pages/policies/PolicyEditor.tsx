"use client";

import { useEffect, useState } from "react";
import { Eye, Save, Trash } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { FormattedMarkdown } from "@/components/ui/formatted-markdown";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getPoliciesFromTranslations, setPolicyToTranslation } from "@/lib/policies/policies.action";

import { PoliceJsonTree } from "./PolicyJsonTree";

export function PolicyEditor({ supportedLanguages }: { supportedLanguages: string[] }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [paths, setPaths] = useState<any>({});
  const [language, setLanguage] = useState("pt-BR");
  const [policyPath, setPolicyPath] = useState("");
  const [rawText, setRawText] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPoliciesFromTranslations(language)
      .then((data) => {
        if (data === null) return;
        setPaths(data["Policies"] ?? {});
      })
      .finally(() => setLoading(false));
  }, [language]);

  useEffect(() => {
    if (policyPath.length === 0) {
      setMarkdown("");
      return;
    }

    const policy = policyPath
      .split(".")
      .filter((segment) => segment.length > 0)
      .reduce((acc, segment) => acc[segment], paths);
    if (policy === undefined) return;
    setRawText(policy.__content__ ?? "");
    setMarkdown(policy.__content__ ?? "");
  }, [policyPath]);

  const handlePreview = () => {
    setMarkdown(rawText);
  };

  const handleSave = () => {
    setLoading(true);
    setPolicyToTranslation(language, policyPath, rawText)
      .then((data) => {
        toast.success("Política salva com sucesso!", { closeButton: true });
        setPaths(data["Policies"] ?? {});
      })
      .catch((e) => toast.error(e, { closeButton: true }))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex h-dvh gap-8 p-8 px-4">
      <aside>
        <PoliceJsonTree id="map" tree={paths["map"] ?? {}} prefix="" onClick={setPolicyPath} disabled />
      </aside>
      <div className="flex grow flex-col gap-4">
        <header className="flex items-center justify-between">
          <div className="flex gap-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectContent>
                {supportedLanguages.map((lang, index) => (
                  <SelectItem key={index} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
              <SelectTrigger>
                <SelectValue placeholder="Escolha o idioma" />
              </SelectTrigger>
            </Select>
            <p className="my-auto">{policyPath ?? "<NULL>"}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant={"accent"} onClick={handlePreview} disabled={loading}>
              <Eye /> Visualizar
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              <Save /> Salvar
            </Button>
            <Button variant={"destructive"} disabled>
              <Trash /> Limpar
            </Button>
          </div>
        </header>
        <main className="grid grow grid-cols-2 gap-8">
          <Textarea
            disabled={policyPath.length === 0}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
          ></Textarea>
          <div className="bg-card border-border rounded-md border-1">
            <FormattedMarkdown>{markdown}</FormattedMarkdown>
          </div>
        </main>
      </div>
    </div>
  );
}
