import { Heart } from "lucide-react";

export function FooterBottom() {
  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <span>© 2024 Ludus. Feito com</span>
        <Heart className="h-4 w-4 fill-current text-red-500" />
        <span>no Brasil.</span>
      </div>

      <p className="text-primary text-center text-sm">Liberdade - União - Diversidade - Utopia - Sustentabilidade</p>
    </div>
  );
}
