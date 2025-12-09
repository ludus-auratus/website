"use client";

import { createContext, useContext, useState } from "react";

interface TeamContextData {
  selected: number;
  setSelected: (id: number) => void;
}

const TeamContext = createContext<TeamContextData | undefined>(undefined);

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState(0);

  const data: TeamContextData = {
    selected,
    setSelected,
  };

  return <TeamContext value={data}>{children}</TeamContext>;
}

export function useTeam() {
  const context = useContext(TeamContext);

  if (context === undefined) {
    throw new Error("useTeam deve ser usado dentro de um DevProvider");
  }

  return context;
}
