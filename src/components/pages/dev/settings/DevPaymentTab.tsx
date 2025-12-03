import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";

export default function DevPaymentTab({ onChange }: { onChange: (hasChanges: boolean) => void }) {
  return (
    <TabsContent value="payment" className="space-y-6">
      <Card className="border-border border-2 p-6">
        <h3 className="text-foreground font-ludus-pixelify-sans mb-6 text-xl">Informações de Pagamento</h3>

        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="document">CPF/CNPJ</Label>
              <Input id="document" defaultValue="123.456.789-00" onChange={() => onChange(true)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Nome da Empresa (Opcional)</Label>
              <Input id="companyName" placeholder="Razão social" onChange={() => onChange(true)} />
            </div>
          </div>

          <Separator />

          <div>
            <Label className="mb-3 block">Método de Recebimento</Label>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border-accent bg-accent/5 rounded-xl border-2 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-foreground font-medium">PIX</span>
                  <Badge className="bg-accent text-accent-foreground">Ativo</Badge>
                </div>
                <p className="text-muted-foreground mb-3 text-sm">Chave: joao.silva@email.com</p>
                <Button variant="outline" size="sm">
                  Alterar Chave
                </Button>
              </div>
              <div className="border-border rounded-xl border-2 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-foreground font-medium">Transferência Bancária</span>
                </div>
                <p className="text-muted-foreground mb-3 text-sm">Não configurado</p>
                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="minPayout">Valor Mínimo para Saque</Label>
            <Select defaultValue="50">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">R$ 50,00</SelectItem>
                <SelectItem value="100">R$ 100,00</SelectItem>
                <SelectItem value="200">R$ 200,00</SelectItem>
                <SelectItem value="500">R$ 500,00</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-muted-foreground text-xs">Você será pago quando atingir esse valor</p>
          </div>
        </div>
      </Card>

      {/* Tax Info */}
      <Card className="border-border border-2 p-6">
        <h3 className="text-foreground font-ludus-pixelify-sans mb-4 text-xl">Informações Fiscais</h3>
        <div className="bg-muted/50 space-y-2 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Tipo de Pessoa</span>
            <span className="text-foreground font-medium">Física</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Retenção de IR</span>
            <span className="text-foreground font-medium">Não se aplica</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Emissão de NF</span>
            <span className="text-foreground font-medium">Não habilitado</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="mt-4">
          Atualizar Informações Fiscais
        </Button>
      </Card>
    </TabsContent>
  );
}
