"use client";

import { createContext, useContext, useState } from "react";

import { PolicyEditorContextData } from "@/lib/policies";

const PolicyEditorContext = createContext<PolicyEditorContextData | undefined>(undefined);

export function PolicyEditorProvider({ children }: { children: React.ReactNode }) {
  const [policyPath, setPolicyPath] = useState("");

  const data: PolicyEditorContextData = {
    policyPath,
    setPolicyPath,
  };

  return <PolicyEditorContext value={data}>{children}</PolicyEditorContext>;
}

export function usePolicyEditorContext() {
  return useContext(PolicyEditorContext);
}
