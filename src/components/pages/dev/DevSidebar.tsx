"use client";

import React, { ForwardRefExoticComponent, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { BarChart3, Calendar, HammerIcon, LayoutDashboard, MessageSquare, MoreVertical, Settings } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useDev } from "@/context/DevContext";
import { cn } from "@/lib/utils/shadcn";

interface SidebarItem {
  icon: ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  id: string;
  label: string;
  wip?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, id: "dashboard", label: "Dashboard" },
  { icon: Calendar, id: "publications", label: "Publicações" },
  { icon: BarChart3, id: "analytics", label: "Análises", wip: true },
  { icon: MessageSquare, id: "reviews", label: "Avaliações", wip: true },
  { icon: Settings, id: "settings", label: "Configurações", wip: true },
];

export default function DevSidebar() {
  const ctx = useDev();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="border-sidebar-border border-b px-6 py-4">
          <div className="flex items-center space-x-3">
            <Image src="/images/ludus/logo-marginless.png" alt="" width={128} height={128} className="h-10 w-10" />
            <div>
              <h2 className="text-sidebar-foreground font-ludus-pixelify-sans">Ludus</h2>
              <p className="text-muted-foreground text-xs">Portal do Desenvolvedor</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="gap-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = ctx.getSection() === item.id;
              const href = `/dev/${item.id}`;
              return (
                <SidebarMenuButton key={item.id} asChild>
                  <Link
                    href={item.wip ? "#" : href}
                    className={cn(
                      "bg-border/50 flex w-full items-center gap-3 rounded-md px-4 py-5 transition-all duration-200",
                      isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                      item.wip && "cursor-not-allowed opacity-50",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {item.wip && <HammerIcon className="ml-auto" />}
                  </Link>
                </SidebarMenuButton>
              );
            })}
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-sidebar-border border-t p-4">
          <div className="bg-sidebar-primary/50 flex items-center gap-3 rounded-xl p-3">
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
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
