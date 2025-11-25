import { ReactNode } from "react";

import { CatalogSidebar } from "@/components/pages/catalog/CatalogSidebar";

interface CatalogGridProps {
  children: ReactNode;
  showFilters: boolean;
}

export function CatalogGrid({ children, showFilters }: CatalogGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      {showFilters && <CatalogSidebar />}

      <div
        className={`flex flex-wrap justify-center gap-6 space-y-6 ${showFilters ? "lg:col-span-3" : "lg:col-span-4"}`}
      >
        {children}
      </div>
    </div>
  );
}
