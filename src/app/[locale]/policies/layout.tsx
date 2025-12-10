import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Book } from "lucide-react";

import { SidebarPolicy } from "@/components/pages/policies/SidebarPolicy";
import { SidebarPolicyTree } from "@/components/pages/policies/SidebarPolicyTree";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getPoliciesNavigationMap } from "@/lib/policies";

export default async function PoliciesLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations("Policies");
  const articleMap = await getPoliciesNavigationMap();

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
          <SidebarGroup>
            <SidebarMenu>
              <SidebarPolicyTree structure={articleMap.structure} />
            </SidebarMenu>
          </SidebarGroup>
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
