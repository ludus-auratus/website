"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils/shadcn";

import { Badge } from "./badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface MultiSelectOption {
  id: string;
  name: string;
  type?: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  maxCount?: number;
  error?: string;
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    { options, selected, onChange, placeholder = "Selecione...", className, maxCount = 3, error }: MultiSelectProps,
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const id = React.useId();

    const handleUnselect = (id: string) => {
      onChange(selected.filter((s) => s !== id));
    };

    const handleSelect = (id: string) => {
      if (selected.includes(id)) {
        onChange(selected.filter((s) => s !== id));
      } else {
        onChange([...selected, id]);
      }
    };

    const selectedOptions = options.filter((opt) => selected.includes(opt.id));

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            ref={ref}
            className={cn(
              "border-border placeholder:text-muted-foreground focus:border-primary focus:ring-primary flex min-h-12 w-full items-center justify-between rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "dark:bg-input/30 bg-input-background",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              className,
            )}
            role="combobox"
            aria-invalid={!!error}
            aria-expanded={open}
            aria-controls={`${id}-list`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setOpen((prev) => !prev);
              }
            }}
          >
            <div className="flex flex-wrap gap-1">
              {selectedOptions.length === 0 && <span className="text-muted-foreground">{placeholder}</span>}
              {selectedOptions.slice(0, maxCount).map((option) => (
                <Badge
                  variant="secondary"
                  key={option.id}
                  className="mr-1 border-[#71E256]/30 bg-[#71E256]/20 text-[#71E256] hover:bg-[#71E256]/30"
                >
                  {option.name}
                  <button
                    className="ring-offset-background focus:ring-ring ml-1 cursor-pointer rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(option.id);
                        e.stopPropagation();
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(option.id)}
                  >
                    <X className="h-3 w-3 text-[#71E256] hover:text-[#71E256]/80" />
                  </button>
                </Badge>
              ))}
              {selectedOptions.length > maxCount && (
                <Badge variant="secondary" className="bg-muted text-muted-foreground border-border">
                  +{selectedOptions.length - maxCount} mais
                </Badge>
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Buscar..." />
            <CommandList id={`${id}-list`}>
              <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {options.map((option) => (
                  <CommandItem
                    key={option.id}
                    onSelect={() => handleSelect(option.id)}
                    className="data-[selected=true]:bg-accent/10 data-[selected=true]:text-accent cursor-pointer"
                  >
                    <Check className={cn("mr-2 h-4 w-4", selected.includes(option.id) ? "opacity-100" : "opacity-0")} />
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

MultiSelect.displayName = "MultiSelect";
