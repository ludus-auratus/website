import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Book } from "lucide-react";

import { SidebarPolicy } from "@/components/pages/policies/SidebarPolicy";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getPoliciesNaviagationMap } from "@/lib/policies";

export default async function PoliciesLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations("Policies");
  const articleMap = getPoliciesNaviagationMap();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div>
            <Button variant={"link"} className="text-xs" asChild>
              <Link href="/">
                <ArrowLeft className="inline" />
                <span>{t("back")}</span>
              </Link>
            </Button>
          </div>
          <h2 className="px-4">
            <Book className="inline" /> {t("title")}
          </h2>
        </SidebarHeader>

        <Separator />

        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuSubItem>
              <SidebarGroup className="px-4">
                {articleMap.structure.map((node, index) => (
                  <SidebarPolicy key={index} policy={node} namespace="Policies.map" />
                ))}
              </SidebarGroup>
            </SidebarMenuSubItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>Footer</SidebarFooter>
      </Sidebar>
      <main>
        <SidebarTrigger className="md:hidden" />
        {children}
      </main>
    </SidebarProvider>
  );
}
