import { LuGithub, LuInstagram, LuTwitter, LuYoutube } from "react-icons/lu";
import { Disc, Globe, Music2, Twitter, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const socialMedias = [
  { icon: Globe, label: "Website", placeholder: "https://seu-site.com" },
  { icon: LuYoutube, label: "YouTube", placeholder: "youtube.com/@seu-canal" },
  { icon: LuInstagram, label: "Instagram", placeholder: "@seu-usuario" },
  { icon: Disc, label: "Discord", placeholder: "@seu-usuario" },
  { icon: LuTwitter, label: "Twitter", placeholder: "@seu-usuario" },
  { icon: LuGithub, label: "GitHub", placeholder: "/seu-usuario" },
  { icon: Music2, label: "TikTok", placeholder: "@seu-usuario" },
];

export default function DevProfileTab({ onChange }: { onChange: (hasChanges: boolean) => void }) {
  return (
    <TabsContent value="profile" className="pace-y-6">
      <Card className="border-border border-2 p-6">
        <h3 className="text-foreground font-ludus-pixelify-sans mb-6 text-xl">Informações Pessoais</h3>

        <div className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" alt="Developer" />
              <AvatarFallback className="bg-accent text-accent-foreground font-ludus-pixelify-sans text-2xl">
                JS
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <Button variant="outline" size="sm">
                Alterar Foto
              </Button>

              <p className="text-muted-foreground text-xs">PNG, JPG ou GIF. Máximo 2MB.</p>
            </div>
          </div>

          <Separator />

          {/* Form Fields */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input id="fullName" defaultValue="João Silva" onChange={() => onChange(true)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="flex gap-2">
                <Input id="email" type="email" defaultValue="joao.silva@email.com" onChange={() => onChange(true)} />
                <Badge variant="secondary" className="self-center border-green-500/20 bg-green-500/10 text-green-500">
                  Verificado
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" defaultValue="(11) 99999-9999" onChange={() => onChange(true)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">País</Label>
              <Select defaultValue="br">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="br">🇧🇷 Brasil</SelectItem>
                  <SelectItem value="pt">🇵🇹 Portugal</SelectItem>
                  <SelectItem value="us">🇺🇸 Estados Unidos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={4}
              placeholder="Conte um pouco sobre você..."
              defaultValue="Desenvolvedor indie brasileiro apaixonado por jogos que celebram nossa cultura."
              onChange={() => onChange(true)}
            />
            <p className="text-muted-foreground text-xs">Máximo 500 caracteres</p>
          </div>
        </div>
      </Card>

      <Card className="border-border border-2 p-6">
        <h3 className="text-foreground font-ludus-pixelify-sans mb-6 text-xl">Redes Sociais</h3>

        <div className="grid grid-cols-2 gap-4">
          {socialMedias.map(({ icon: Icon, label, placeholder }) => (
            <div key={label} className="space-y-2">
              <Label htmlFor={label}>
                <Icon className="h-5 w-5" />
                {label}
              </Label>
              <Input id={label} placeholder={placeholder} onChange={() => onChange(true)} />
            </div>
          ))}
        </div>
      </Card>
    </TabsContent>
  );
}
