"use client";

import { useEffect, useState } from "react";
import { ArrowRightCircle, BrushCleaning, Eye, List, Minus, Plus, Save, Trash } from "lucide-react";
import { toast } from "sonner";
import { set } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormattedMarkdown } from "@/components/ui/formatted-markdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  addPolicyToTranslation,
  getPoliciesFromTranslations,
  removePolicyFromTranslation,
  setPolicyToTranslation,
} from "@/lib/policies/policies.action";
import { PopoverClose } from "@radix-ui/react-popover";

import { PoliceJsonTree } from "./PolicyJsonTree";

export function PolicyEditor({ supportedLanguages }: { supportedLanguages: string[] }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [paths, setPaths] = useState<any>({});
  const [language, setLanguage] = useState("pt-BR");
  const [policyPath, setPolicyPath] = useState(".map");
  const [policyTitle, setPolicyTitle] = useState("");
  const [policyContent, setPolicyContent] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [openedCreationDialog, setOpenedCreationDialog] = useState(false);
  const [creationId, setCreationId] = useState("");
  const [creationTitle, setCreationTitle] = useState("");
  const [openedRemoveDialog, setOpenedRemoveDialog] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPoliciesFromTranslations(language)
      .then((data) => {
        if (data === null) return;
        setPaths(data["Policies"] ?? {});
        setPolicyPath(".map");
      })
      .finally(() => setLoading(false));
  }, [language]);

  useEffect(() => {
    if (policyPath.length === 0) {
      setMarkdown("");
      return;
    }

    putPolicyContent();
  }, [policyPath]);

  const rootPolicy = policyPath === ".map";

  const putPolicyContent = () => {
    const policy = policyPath
      .split(".")
      .filter((segment) => segment.length > 0)
      .reduce((acc, segment) => acc[segment], paths);
    if (policy === undefined) return;
    setPolicyTitle(policy.__title__ ?? "");
    setPolicyContent(policy.__content__ ?? "");
    setMarkdown(policy.__content__ ?? "");
  };

  const handlePreview = () => {
    setMarkdown(policyContent);
  };

  const handleSave = () => {
    setLoading(true);
    setPolicyToTranslation(language, policyPath, policyTitle, policyContent)
      .then((data) => {
        toast.success("Política salva com sucesso!", { closeButton: true });
        setPaths(data["Policies"] ?? {});
      })
      .catch((e) => toast.error(e, { closeButton: true }))
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePolicyCreation = (ev: React.FormEvent) => {
    ev.preventDefault();

    setCreationId("");
    setCreationTitle("");

    setLoading(true);
    addPolicyToTranslation(language, `${policyPath}.${creationId}`, creationTitle)
      .then((data) => {
        toast.success("Política criada com sucesso!", { closeButton: true });
        setPaths(data["Policies"] ?? {});
        setPolicyPath(`${policyPath}.${creationId}`);
      })
      .catch((e) => toast.error(e, { closeButton: true }))
      .finally(() => setLoading(false));
  };

  const handlePolicyDestruction = () => {
    setLoading(true);
    removePolicyFromTranslation(language, policyPath)
      .then((data) => {
        toast.success("Política removida com sucesso!", { closeButton: true });
        setPaths(data["Policies"] ?? {});
        setPolicyPath(policyPath.split(".").slice(0, -1).join("."));
      })
      .catch((e) => toast.error(e, { closeButton: true }))
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex h-dvh gap-8 p-8 px-4">
      <aside className="min-w-64">
        <PoliceJsonTree id="map" tree={paths["map"] ?? {}} prefix="" onClick={setPolicyPath} />
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
            <div className="my-auto">
              <p className="text-muted-foreground text-sm">Política:</p>
              <p>{policyPath ?? "<NULL>"}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant={"accent"} onClick={handlePreview} disabled={loading || rootPolicy}>
              <Eye /> Visualizar
            </Button>
            <Button onClick={handleSave} disabled={loading || rootPolicy}>
              <Save /> Salvar
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"destructive"} disabled={loading || rootPolicy}>
                  <BrushCleaning /> Limpar
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="flex w-fit flex-col items-center">
                <h4>Limpar Modificações?</h4>
                <div className="space-x-4">
                  <PopoverClose asChild>
                    <Button variant={"destructive"} onClick={putPolicyContent}>
                      Sim
                    </Button>
                  </PopoverClose>
                  <PopoverClose asChild>
                    <Button variant={"outline"}>Não</Button>
                  </PopoverClose>
                </div>
              </PopoverContent>
            </Popover>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"} disabled={loading}>
                  <List />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setOpenedCreationDialog(true)}>
                  <Plus /> Adicionar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenedRemoveDialog(true)} disabled={rootPolicy}>
                  <Minus /> Remover
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={openedCreationDialog} onOpenChange={setOpenedCreationDialog}>
              <DialogTrigger asChild></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nova Política</DialogTitle>
                  <DialogDescription>Insira o identificador dessa nova política</DialogDescription>
                </DialogHeader>

                <form className="space-y-4" onSubmit={handlePolicyCreation}>
                  <div>
                    <Label htmlFor="new-policy-id">Identificador: (obrigatório)</Label>
                    <Input
                      type="text"
                      placeholder="snake_case_please"
                      id="new-policy-id"
                      autoComplete="one-time-code"
                      required
                      value={creationId}
                      onChange={(e) =>
                        setCreationId(e.target.value.replaceAll(" ", "_").replaceAll(".", "_").toLowerCase())
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="new-policy-title">Título: </Label>
                    <Input
                      type="text"
                      placeholder="snake_case_please"
                      id="new-policy-title"
                      autoComplete="one-time-code"
                      value={creationTitle}
                      onChange={(e) => setCreationTitle(e.target.value)}
                    />
                  </div>

                  <div className="mx-auto flex w-1/2 gap-2">
                    <DialogClose asChild>
                      <Button className="w-1/2" type="submit">
                        Criar
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant={"destructive"} className="w-1/2">
                        Cancelar
                      </Button>
                    </DialogClose>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={openedRemoveDialog} onOpenChange={setOpenedRemoveDialog}>
              <DialogTrigger asChild></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Remover política?</DialogTitle>
                  <DialogDescription>Essa é uma ação irreversível, cuidado!</DialogDescription>
                </DialogHeader>

                <div className="mx-auto flex w-1/2 gap-2">
                  <DialogClose asChild>
                    <Button className="w-1/2" variant={"destructive"} onClick={handlePolicyDestruction}>
                      Sim
                    </Button>
                  </DialogClose>

                  <DialogClose asChild>
                    <Button className="w-1/2" variant={"outline"}>
                      Não
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>
        <main className="flex grow gap-4">
          <div className="flex basis-1/2 flex-col gap-2">
            <p className="text-muted-foreground text-sm">Título: </p>
            <Input
              type="text"
              placeholder="Como fazer bolo?"
              value={policyTitle}
              onChange={(e) => setPolicyTitle(e.target.value)}
            />
            <p className="text-muted-foreground text-sm">Conteúdo: </p>
            <Textarea
              disabled={policyPath.length === 0}
              value={policyContent}
              onChange={(e) => setPolicyContent(e.target.value)}
              className="h-full"
            ></Textarea>
          </div>
          <Separator orientation="vertical" />
          <div className="bg-card border-border basis-1/2 rounded-md border-1">
            <FormattedMarkdown>{markdown}</FormattedMarkdown>
          </div>
        </main>
      </div>
    </div>
  );
}
