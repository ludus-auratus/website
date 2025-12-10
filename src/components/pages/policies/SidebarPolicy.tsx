"use client";

import { CompanyPolicy } from "@/lib/policies";

import { SidebarPolicyArticle } from "./SidebarPolicyArticle";
import { SidebarPolicySection } from "./SidebarPolicySection";

export function SidebarPolicy({ policy, namespace }: { policy: CompanyPolicy; namespace: string }) {
  return (
    <>
      {policy.type === "article" ? (
        <SidebarPolicyArticle translationNamespace={namespace} translationKey={policy.key} />
      ) : (
        <SidebarPolicySection nodes={policy.nodes} translationNamespace={namespace} translationKey={policy.key} />
      )}
    </>
  );
}
