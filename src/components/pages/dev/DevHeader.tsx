import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import { DevSection } from "./DevPageWrapper";

export default function DevHeader({ section }: { section: DevSection }) {
  const { id, message } = section;
  return (
    <header className="bg-background border-border sticky top-0 z-10 border-b backdrop-blur-sm">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h1 className="text-foreground font-ludus-pixelify-sans text-2xl">{id}</h1>
          {message && <p className="text-muted-foreground text-sm">{message}</p>}
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input placeholder="Buscar jogos, estatísticas..." className="pl-10" />
          </div>
        </div>
      </div>
    </header>
  );
}
