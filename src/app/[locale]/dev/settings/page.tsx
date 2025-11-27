"use client";
import { useEffect, useState } from "react";
import { Bell, Building, CreditCard, Save, Shield, User, X } from "lucide-react";

import DevNotificationsTab from "@/components/pages/dev/settings/DevNotificationsTab";
import DevPaymentTab from "@/components/pages/dev/settings/DevPaymentTab";
import DevProfileTab from "@/components/pages/dev/settings/DevProfileTab";
import DevSecurityTab from "@/components/pages/dev/settings/DevSecurityTab";
import DevStudioTab from "@/components/pages/dev/settings/DevStudioTab";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDev } from "@/context/DevContext";
import { cn } from "@/lib/utils/shadcn";

export default function DevSettingsPage() {
  const ctx = useDev();
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { icon: User, id: "profile", label: "Perfil", element: DevProfileTab },
    { icon: Building, id: "studio", label: "Estudio", element: DevStudioTab },
    { icon: CreditCard, id: "payment", label: "Pagamentos", element: DevPaymentTab },
    // { icon: Bell, id: "notifications", label: "Notificação", element: DevNotificationsTab },
    // { icon: Shield, id: "security", label: "Segurança", element: DevSecurityTab },
  ];

  useEffect(() => {
    ctx.setSection("settings");
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground font-ludus-pixelify-sans mb-2 text-3xl">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as preferências da sua conta de desenvolvedor</p>
        </div>

        <div
          className={cn(
            "flex gap-2 transition-all",
            hasChanges ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Save className="h-4 w-4" />
            Salvar
          </Button>
          <Button variant="outline" onClick={() => setHasChanges(false)}>
            <X className="h-4 w-4" />
            Cancelar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="flex w-full">
          {tabs.map((tab, index) => (
            <TabsTrigger key={index} value={tab.id}>
              <tab.icon className="mr-2 h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab, index) => {
          const Tab = tab.element;
          return <Tab key={index} onChange={setHasChanges} />;
        })}
      </Tabs>
    </div>
  );
}
