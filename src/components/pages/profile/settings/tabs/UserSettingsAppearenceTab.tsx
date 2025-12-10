"use client";

import { Languages, Monitor, Moon, Palette, Smartphone, Sun } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";

export function UserSettingsAppearenceTab() {
  return (
    <TabsContent value="appearance" className="space-y-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-ludus-pixelify-sans flex items-center space-x-2 text-lg">
              <Palette className="text-primary h-5 w-5" />
              <span>Tema</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Modo Escuro</p>
                  <p className="text-muted-foreground text-sm">Alterna entre tema claro e escuro</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="text-muted-foreground h-4 w-4" />
                  <Switch
                    // checked={isDark} onCheckedChange={setIsDark}
                    className="data-[state=checked]:bg-primary"
                  />
                  <Moon className="text-muted-foreground h-4 w-4" />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-ludus-pixelify-sans font-medium">Visualização Dispositivos</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="border-border hover:border-primary cursor-pointer rounded-lg border p-4 transition-colors">
                  <div className="flex flex-col items-center space-y-2">
                    <Monitor className="text-primary h-8 w-8" />
                    <span className="text-sm">Desktop</span>
                  </div>
                </div>
                <div className="border-border hover:border-primary cursor-pointer rounded-lg border p-4 transition-colors">
                  <div className="flex flex-col items-center space-y-2">
                    <Smartphone className="text-muted-foreground h-8 w-8" />
                    <span className="text-sm">Mobile</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-ludus-pixelify-sans flex items-center space-x-2 text-lg">
              <Languages className="text-primary h-5 w-5" />
              <span>Idioma e Região</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language" className="">
                Idioma da Interface
              </Label>
              <Select defaultValue="pt-br">
                <SelectTrigger className="">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                  <SelectItem value="en-us">English (US)</SelectItem>
                  <SelectItem value="es-es">Español (España)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone" className="">
                Fuso Horário
              </Label>
              <Select defaultValue="america-sao_paulo">
                <SelectTrigger className="">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="america-sao_paulo">América/São_Paulo (UTC-3)</SelectItem>
                  <SelectItem value="america-manaus">América/Manaus (UTC-4)</SelectItem>
                  <SelectItem value="america-rio_branco">América/Rio_Branco (UTC-5)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency" className="">
                Moeda
              </Label>
              <Select defaultValue="brl">
                <SelectTrigger className="">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brl">Real Brasileiro (R$)</SelectItem>
                  <SelectItem value="usd">Dólar Americano ($)</SelectItem>
                  <SelectItem value="eur">Euro (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
