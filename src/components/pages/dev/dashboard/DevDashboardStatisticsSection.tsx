import { ForwardRefExoticComponent } from "react";
import { BarChart3 } from "lucide-react";

import { Button } from "@/components/ui/button";

import DevQuickStat, { QuickStat } from "./DevQuickStat";

export default function DevDashboardStatisticsSection({
  stats,
}: {
  stats: { icon: ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>; stat: QuickStat }[];
}) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-foreground font-ludus-pixelify-sans text-xl">Estatísticas Rápidas</h2>
        <Button variant="outline" size="sm">
          <BarChart3 className="mr-2 h-4 w-4" />
          <span>Ver Relatório Completo</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return <DevQuickStat key={index} icon={Icon} stat={stat.stat} />;
        })}
      </div>
    </div>
  );
}
