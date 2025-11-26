import { ReactNode } from "react";

interface CatalogGridProps {
  children: ReactNode;
  sidebar?: ReactNode;
  showFilters: boolean;
}

export function CatalogGrid({ children, sidebar, showFilters }: CatalogGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      {showFilters && sidebar}

      <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
        <div className={`grid-auto-fill grid justify-center gap-6`}>{children}</div>
      </div>
    </div>
  );
}
