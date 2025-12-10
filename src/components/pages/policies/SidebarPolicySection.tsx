import { getTranslations } from "next-intl/server";
import { ChevronDown } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CompanyPolicy } from "@/lib/policies";

import { SidebarPolicy } from "./SidebarPolicy";

export async function SidebarPolicySection({
  translationKey,
  translationNamespace: translationPrefix,
  nodes,
}: {
  translationKey: string;
  translationNamespace: string;
  nodes?: CompanyPolicy[];
}) {
  const translationNamespace = `${translationPrefix}.${translationKey}`;
  const t = await getTranslations(translationNamespace);
  return (
    <SidebarMenu>
      <Collapsible disabled={!nodes || nodes.length === 0}>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              {t("__title__")}
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {nodes?.map((node, index) => (
              <SidebarPolicy key={index} policy={node} namespace={translationNamespace} />
            ))}
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
}
