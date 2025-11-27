import { Bell, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";

const notifications = [
  {
    id: "sales",
    label: "Novas vendas",
    description: "Receber notificação quando alguém comprar seu jogo",
    enabled: true,
  },
  { id: "reviews", label: "Novos reviews", description: "Quando jogadores avaliarem seus jogos", enabled: true },
  {
    id: "updates",
    label: "Atualizações da plataforma",
    description: "Novidades e melhorias do Ludus",
    enabled: true,
  },
  {
    id: "marketing",
    label: "Dicas de marketing",
    description: "Sugestões para aumentar suas vendas",
    enabled: false,
  },
  {
    id: "weekly",
    label: "Relatório semanal",
    description: "Resumo de performance toda segunda-feira",
    enabled: true,
  },
];

export default function DevNotificationsTab({ onChange }: { onChange: (hasChanges: boolean) => void }) {
  return (
    <TabsContent value="notifications" className="space-y-6">
      <Card className="border-border border-2 p-6">
        <h3 className="text-foreground font-ludus-pixelify-sans mb-6 text-xl">Preferências de Notificação</h3>

        <div className="space-y-6">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="border-border flex items-start justify-between gap-4 border-b pb-6 last:border-0 last:pb-0"
            >
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <Label htmlFor={notification.id} className="cursor-pointer">
                    {notification.label}
                  </Label>
                  {notification.enabled && (
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 text-xs">
                      Ativo
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">{notification.description}</p>
              </div>
              <Switch
                id={notification.id}
                defaultChecked={notification.enabled}
                onCheckedChange={() => onChange(true)}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Email Preferences */}
      <Card className="border-border border-2 p-6">
        <h3 className="text-foreground font-ludus-pixelify-sans mb-6 text-xl">Canais de Notificação</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="text-accent h-5 w-5" />
              <div>
                <p className="text-foreground font-medium">E-mail</p>
                <p className="text-muted-foreground text-sm">joao.silva@email.com</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="text-accent h-5 w-5" />
              <div>
                <p className="text-foreground font-medium">Notificações Push</p>
                <p className="text-muted-foreground text-sm">No navegador</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>
    </TabsContent>
  );
}
