import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function DevStudioTab({ onChange }: { onChange: (hasChanges: boolean) => void }) {
  return (
    <TabsContent value="studio" className="space-y-6">
      <Card className="border-border border-2 p-6">
        <h3 className="text-foreground font-ludus-pixelify-sans mb-6 text-xl">Informações do Estúdio</h3>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="studioName">Nome do Estúdio</Label>
            <Input id="studioName" defaultValue="Pixelados Studio" onChange={() => onChange(true)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studioDescription">Descrição do Estúdio</Label>
            <Textarea
              id="studioDescription"
              rows={4}
              placeholder="Descreva seu estúdio..."
              defaultValue="Estúdio indie focado em jogos que celebram a cultura brasileira através de narrativas envolventes e mecânicas inovadoras."
              onChange={() => onChange(true)}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="founded">Fundado em</Label>
              <Input id="founded" type="number" defaultValue="2022" onChange={() => onChange(true)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamSize">Tamanho da Equipe</Label>
              <Select defaultValue="small">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Solo (1 pessoa)</SelectItem>
                  <SelectItem value="small">Pequeno (2-5)</SelectItem>
                  <SelectItem value="medium">Médio (6-20)</SelectItem>
                  <SelectItem value="large">Grande (20+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <Input id="location" defaultValue="São Paulo, Brasil" onChange={() => onChange(true)} />
          </div>
        </div>
      </Card>
    </TabsContent>
  );
}
