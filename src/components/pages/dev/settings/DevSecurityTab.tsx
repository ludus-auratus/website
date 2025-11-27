import { Key, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

const securityLogs = [
  { action: "Login realizado", device: "Windows • Chrome", location: "São Paulo, BR", date: "Hoje às 14:32" },
  { action: "Senha alterada", device: "Windows • Chrome", location: "São Paulo, BR", date: "15/12/2024" },
  { action: "Login realizado", device: "iPhone • Safari", location: "São Paulo, BR", date: "12/12/2024" },
];

export default function DevSecurityTab() {
  return (
    <TabsContent value="security" className="space-y-6">
      <Card className="border-border border-2 p-6">
        <h3 className="text-foreground font-ludus-pixelify-sans mb-6 text-xl">Senha e Autenticação</h3>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="bg-muted/50 flex items-center justify-between rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Key className="text-accent h-5 w-5" />
                <div>
                  <p className="text-foreground font-medium">Senha</p>
                  <p className="text-muted-foreground text-sm">Última alteração: 15/12/2024</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Alterar Senha
              </Button>
            </div>

            <div className="bg-muted/50 flex items-center justify-between rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Shield className="text-accent h-5 w-5" />
                <div>
                  <p className="text-foreground font-medium">Autenticação de Dois Fatores</p>
                  <p className="text-muted-foreground text-sm">Adicione uma camada extra de segurança</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Ativar 2FA
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* API Keys */}
      <Card className="border-border border-2 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-foreground font-ludus-pixelify-sans text-xl">Chaves de API</h3>
          <Button variant="outline" size="sm">
            Gerar Nova Chave
          </Button>
        </div>

        <div className="space-y-3">
          <div className="bg-muted/50 flex items-center justify-between rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Key className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-foreground font-mono text-sm font-medium">ludus_••••••••••••••••3f2a</p>
                <p className="text-muted-foreground text-xs">Criada em 01/12/2024 • Último uso: Hoje</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-destructive">
              Revogar
            </Button>
          </div>
        </div>
      </Card>

      {/* Security Log */}
      <Card className="border-border border-2 p-6">
        <h3 className="text-foreground font-ludus-pixelify-sans mb-6 text-xl">Atividade Recente</h3>

        <div className="space-y-4">
          {securityLogs.map((log, index) => (
            <div key={index} className="border-border flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
              <div className="bg-accent mt-2 h-2 w-2 rounded-full" />
              <div className="flex-1">
                <p className="text-foreground text-sm font-medium">{log.action}</p>
                <p className="text-muted-foreground text-xs">{log.device}</p>
                <p className="text-muted-foreground text-xs">
                  {log.location} • {log.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" size="sm" className="mt-4 w-full">
          Ver Todo o Histórico
        </Button>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive bg-destructive/5 border-2 p-6">
        <h3 className="text-destructive font-ludus-pixelify-sans mb-4 text-xl">Zona de Perigo</h3>
        <p className="text-muted-foreground mb-4 text-sm">Estas ações são irreversíveis. Proceda com cautela.</p>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground w-full"
          >
            Desativar Conta Temporariamente
          </Button>
          <Button variant="destructive" className="w-full">
            Excluir Conta Permanentemente
          </Button>
        </div>
      </Card>
    </TabsContent>
  );
}
