"use client";

import { Shield, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { useUserSettings } from "@/context/UserSettingsContext";

export function UserSettingsPrivacyTab({ tabId }: { tabId: string }) {
  const { tabs } = useUserSettings();
  const { privacy, setPrivacy } = tabs;
  return (
    <TabsContent value={tabId} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-ludus-pixelify-sans flex items-center space-x-2 text-lg">
            <Shield className="text-primary h-5 w-5" />
            <span>Privacidade e Segurança</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-medium">Visibilidade do Perfil</Label>
              <Select
                value={privacy.profileVisibility}
                onValueChange={(value) => {
                  setPrivacy({ ...privacy, profileVisibility: "public" });
                }}
              >
                <SelectTrigger className="">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Público</SelectItem>
                  <SelectItem value="friends">Apenas Amigos</SelectItem>
                  <SelectItem value="private">Privado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Mostrar E-mail no Perfil</p>
                <p className="text-muted-foreground text-sm">Outros usuários podem ver seu e-mail</p>
              </div>
              <Switch
                checked={privacy.showEmail}
                onCheckedChange={(checked) => {
                  setPrivacy({ ...privacy, showEmail: checked });
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Mostrar Biblioteca de Jogos</p>
                <p className="text-muted-foreground text-sm">Outros usuários podem ver seus jogos</p>
              </div>
              <Switch
                checked={privacy.showGames}
                onCheckedChange={(checked) => {
                  setPrivacy({ ...privacy, showGames: checked });
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Mostrar Conquistas</p>
                <p className="text-muted-foreground text-sm">Exibir suas conquistas e badges</p>
              </div>
              <Switch
                checked={privacy.showAchievements}
                onCheckedChange={(checked) => {
                  setPrivacy({ ...privacy, showAchievements: checked });
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Coleta de Dados</p>
                <p className="text-muted-foreground text-sm">Permitir coleta para melhorar a experiência</p>
              </div>
              <Switch
                checked={privacy.dataCollection}
                onCheckedChange={(checked) => {
                  setPrivacy({ ...privacy, dataCollection: checked });
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Danger Zone */}
      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive font-ludus-pixelify-sans flex items-center space-x-2 text-lg">
            <Trash2 className="h-5 w-5" />
            <span>Zona de Perigo</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm">Estas ações são irreversíveis. Proceda com cuidado.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                Limpar Dados da Conta
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Deletar Conta
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-ludus-pixelify-sans">Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription className="">
                      Esta ação não pode ser desfeita. Isso irá deletar permanentemente sua conta e remover todos os
                      seus dados dos nossos servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="">Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                      Sim, deletar conta
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
