"use client";

import { Gamepad2, Volume2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { useUserSettings } from "@/context/UserSettingsContext";

export function UserSettingsPreferences({ tabId }: { tabId: string }) {
  const { tabs } = useUserSettings();
  const { preferences, setPreferences } = tabs;
  return (
    <TabsContent value={tabId} className="space-y-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-ludus-pixelify-sans flex items-center space-x-2 text-lg">
              <Gamepad2 className="text-primary h-5 w-5" />
              <span>Preferências de Jogos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="font-medium">Gêneros Favoritos</Label>
              <div className="flex flex-wrap gap-2">
                {["Aventura", "RPG", "Puzzle", "Plataforma", "Ação", "Estratégia", "Terror", "Arcade"].map((genre) => (
                  <Badge
                    key={genre}
                    variant={preferences.favoriteGenres.includes(genre) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      preferences.favoriteGenres.includes(genre)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                    onClick={() => {
                      const newGenres = preferences.favoriteGenres.includes(genre)
                        ? preferences.favoriteGenres.filter((g) => g !== genre)
                        : [...preferences.favoriteGenres, genre];
                      setPreferences({ ...preferences, favoriteGenres: newGenres });
                    }}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Nível de Dificuldade Preferido</Label>
              <Select
                value={preferences.difficulty}
                onValueChange={(value) => {
                  setPreferences({ ...preferences, difficulty: value });
                }}
              >
                <SelectTrigger className="">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Iniciante">Iniciante</SelectItem>
                  <SelectItem value="Intermediário">Intermediário</SelectItem>
                  <SelectItem value="Avançado">Avançado</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Idioma dos Jogos</Label>
              <Select
                value={preferences.language}
                onValueChange={(value) => {
                  setPreferences({ ...preferences, language: value });
                }}
              >
                <SelectTrigger className="">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Português">Português</SelectItem>
                  <SelectItem value="Inglês">Inglês</SelectItem>
                  <SelectItem value="Espanhol">Espanhol</SelectItem>
                  <SelectItem value="Qualquer">Qualquer Idioma</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-ludus-pixelify-sans flex items-center space-x-2 text-lg">
              <Volume2 className="text-primary h-5 w-5" />
              <span>Configurações de Reprodução</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Reprodução Automática</p>
                <p className="text-muted-foreground text-sm">Iniciar jogos automaticamente após download</p>
              </div>
              <Switch
                checked={preferences.autoPlay}
                onCheckedChange={(checked) => {
                  setPreferences({ ...preferences, autoPlay: checked });
                }}
              />
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Qualidade de Download</Label>
              <Select
                value={preferences.downloadQuality}
                onValueChange={(value) => {
                  setPreferences({ ...preferences, downloadQuality: "high" });
                }}
              >
                <SelectTrigger className="">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Baixa">Baixa (Economia de dados)</SelectItem>
                  <SelectItem value="Média">Média (Balanceada)</SelectItem>
                  <SelectItem value="Alta">Alta (Melhor qualidade)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-ludus-pixelify-sans font-medium">Estatísticas</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-primary font-ludus-pixelify-sans text-2xl font-bold">47</p>
                  <p className="text-muted-foreground text-sm">Jogos na Biblioteca</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="font-ludus-pixelify-sans text-2xl font-bold text-[var(--ludus-yellow-gold)]">156h</p>
                  <p className="text-muted-foreground text-sm">Tempo Jogado</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
