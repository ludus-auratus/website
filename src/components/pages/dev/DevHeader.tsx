import { getTranslations } from "next-intl/server";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { DevSection } from "./DevPageWrapper";

export default async function DevHeader({ section }: { section: DevSection }) {
  const t = await getTranslations({ locale: "pt-BR", namespace: "Dev.sections" });
  const { id, message } = section;

  return (
    <header className="bg-background border-highlight sticky top-0 z-10 border-b backdrop-blur-sm">
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center justify-start gap-x-2">
          <SidebarTrigger className="h-8 w-8 md:hidden" />
          <div>
            <h1 className="text-foreground font-ludus-pixelify-sans text-2xl">{t(id)}</h1>
            {message && <p className="text-muted-foreground text-sm">{message}</p>}
          </div>
        </div>
      </div>
    </header>
  );
}
