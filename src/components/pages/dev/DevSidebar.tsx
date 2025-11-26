import React, { ForwardRefExoticComponent, useContext } from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  BarChart3,
  Book,
  Calendar,
  Hammer,
  HammerIcon,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  MoreVertical,
  Settings,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils/shadcn";

interface SidebarItem {
  icon: ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  id: string;
  wip?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, id: "dashboard" },
  { icon: BarChart3, id: "analytics", wip: true },
  { icon: Calendar, id: "publications" },
  { icon: MessageSquare, id: "reviews", wip: true },
  { icon: Settings, id: "settings" },
].sort((item) => (!item.wip ? -1 : 0));

interface DevSidebarProps {
  current: string;
}

export default async function DevSidebar({ current }: DevSidebarProps) {
  const t = await getTranslations({ locale: "pt-BR", namespace: "Dev.sections" });
  return (
    <aside className="bg-sidebar border-sidebar-border flex w-64 flex-col border-r">
      <div className="border-sidebar-border border-b p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-sidebar-primary flex h-10 w-10 items-center justify-center rounded-xl">
            <span className="text-sidebar-primary-foreground font-ludus-pixelify-sans text-lg font-bold">L</span>
          </div>
          <div>
            <h2 className="text-sidebar-foreground font-ludus-pixelify-sans">Ludus</h2>
            <p className="text-muted-foreground text-xs">Dev Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = current === item.id;
          const href = `/dev/${item.id}`;
          return (
            <Link
              key={item.id}
              href={item.wip ? "#" : href}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",

                item.wip && "cursor-not-allowed opacity-50",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{t(item.id)}</span>
              {item.wip && <HammerIcon className="ml-auto" />}
            </Link>
          );
        })}
      </nav>

      <div className="border-sidebar-border border-t p-4">
        <div className="bg-sidebar-accent flex items-center gap-3 rounded-xl p-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="" alt="Developer" />
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground font-ludus-pixelify-sans">
              JS
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sidebar-foreground truncate text-sm font-medium">João Silva</p>
            <p className="text-muted-foreground truncate text-xs">Pixelados Studio</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
}
