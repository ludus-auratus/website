"use client";

import { createContext, useContext, useState } from "react";

const DevContext = createContext<DevContextData | undefined>(undefined);

export function DevProvider({ children }: { children: React.ReactNode }) {
  const [section, setSection] = useState("dashboard");

  const getSection = () => section;

  const data: DevContextData = {
    getSection,
    setSection,
  };

  return <DevContext value={data}>{children}</DevContext>;
}

export function useDev() {
  const context = useContext(DevContext);

  if (context === undefined) {
    throw new Error("useDev deve ser usado dentro de um DevProvider");
  }

  return context;
}
