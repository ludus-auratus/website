import { cn } from "@/lib/utils/shadcn";

export function GameInfoContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("border-ludus-green-600 gap-2 rounded-md border-1 p-2 shadow-md shadow-black/25", className)}>
      {children}
    </div>
  );
}
