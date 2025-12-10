"use client";

import { Bell } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { useUserSettings } from "@/context/UserSettingsContext";
import { Separator } from "@radix-ui/react-dropdown-menu";

export function UserSettingsNotificationsTab() {
  const { tabs } = useUserSettings();
  const { notifications, setNotifications } = tabs;
  return (
    <TabsContent value="notifications" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-ludus-pixelify-sans flex items-center space-x-2 text-lg">
            <Bell className="text-primary h-5 w-5" />
            <span>Notificações</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Notificações por E-mail</p>
                <p className="text-muted-foreground text-sm">Receba atualizações importantes por e-mail</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => {
                  setNotifications({ ...notifications, email: checked });
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Notificações Push</p>
                <p className="text-muted-foreground text-sm">Notificações em tempo real no navegador</p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => {
                  setNotifications({ ...notifications, push: checked });
                }}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Atualizações de Jogos</p>
                <p className="text-muted-foreground text-sm">Notificações sobre novos jogos e atualizações</p>
              </div>
              <Switch
                checked={notifications.gameUpdates}
                onCheckedChange={(checked) => {
                  setNotifications({ ...notifications, gameUpdates: checked });
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Alertas de Game Jam</p>
                <p className="text-muted-foreground text-sm">Notificações sobre novas competições e prazos</p>
              </div>
              <Switch
                checked={notifications.jamAlerts}
                onCheckedChange={(checked) => {
                  setNotifications({ ...notifications, jamAlerts: checked });
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Atividade Social</p>
                <p className="text-muted-foreground text-sm">Curtidas, comentários e seguidores</p>
              </div>
              <Switch
                checked={notifications.socialActivity}
                onCheckedChange={(checked) => {
                  setNotifications({ ...notifications, socialActivity: checked });
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">E-mails de Marketing</p>
                <p className="text-muted-foreground text-sm">Promoções, novidades e conteúdo especial</p>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(checked) => {
                  setNotifications({ ...notifications, marketing: checked });
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
