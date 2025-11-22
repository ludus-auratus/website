import { Filter, Search, SortAsc, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CatalogHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export function CatalogHeader({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  showFilters,
  setShowFilters,
}: CatalogHeaderProps) {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />

          <Input
            placeholder="Buscar jogos ou desenvolvedores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 pl-10"
          />

          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              aria-label="Limpar busca"
              onClick={() => setSearchTerm("")}
              className="absolute top-1/2 right-1 -translate-y-1/2 transform"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-48">
            <SortAsc className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="popular">Mais Popular</SelectItem>
            <SelectItem value="rating">Melhor Avaliado</SelectItem>
            <SelectItem value="price-low">Menor Preço</SelectItem>
            <SelectItem value="price-high">Maior Preço</SelectItem>
            <SelectItem value="name">Nome (A-Z)</SelectItem>
          </SelectContent>
        </Select>

        <Button size="lg" className="py-6" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>
    </div>
  );
}
