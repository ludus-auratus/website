import Link from "next/link";
import { useTranslations } from "next-intl";
import { ChevronDown, Search } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { CompanyPolicy } from "@/lib/policies";

import { SidebarPolicy } from "./SidebarPolicy";

export function SidebarPolicySection({
  translationKey,
  translationNamespace: translationPrefix,
  nodes,
}: {
  translationKey: string;
  translationNamespace: string;
  nodes?: CompanyPolicy[];
}) {
  const translationNamespace = `${translationPrefix}.${translationKey}`;
  const t = useTranslations(translationNamespace);
  return (
    <SidebarMenu>
      <Collapsible disabled={!nodes || nodes.length === 0}>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              {t("__title__")}

              {t.has("__content__") && (
                <SidebarMenuAction asChild>
                  <Link href={`/policies/${translationNamespace.split(".").slice(2).join("-")}`}>
                    <Search /> <span className="sr-only">Add Project</span>
                  </Link>
                </SidebarMenuAction>
              )}

              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub className="mr-0 pr-0">
              {nodes?.map((node, index) => (
                <SidebarPolicy key={index} policy={node} namespace={translationNamespace} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
}
