"use client";

import { SidebarMenuSubItem } from "@/components/ui/sidebar";
import { CompanyPolicy } from "@/lib/policies";

import { SidebarPolicy } from "./SidebarPolicy";

export function SidebarPolicyTree({ structure }: { structure: CompanyPolicy[] }) {
  return (
    <SidebarMenuSubItem className="px-4">
      {structure.map((node, index) => (
        <SidebarPolicy key={index} policy={node} namespace="Policies.map" />
      ))}
    </SidebarMenuSubItem>
  );
}
