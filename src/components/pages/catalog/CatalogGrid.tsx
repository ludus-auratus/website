import { ReactNode } from "react";

interface CatalogGridProps {
  children: ReactNode;
  sidebar?: ReactNode;
  showFilters: boolean;
}

export function CatalogGrid({ children, sidebar, showFilters }: CatalogGridProps) {
  return (
    <div className={`flex flex-col lg:flex-row ${showFilters ? "gap-6" : ""}`}>
      <div
        className={`transition-all duration-300 ease-in-out ${
          showFilters
            ? "max-h-[1000px] opacity-100 lg:max-h-none lg:w-64"
            : "max-h-0 overflow-hidden opacity-0 lg:max-h-none lg:w-0"
        }`}
      >
        <div className="w-full lg:w-64">{sidebar}</div>
      </div>

      <div className="flex-1">
        <div className="grid-auto-fill grid justify-center gap-6">{children}</div>
      </div>
    </div>
  );
}
