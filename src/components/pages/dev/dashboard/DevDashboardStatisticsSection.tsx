import { ForwardRefExoticComponent } from "react";
import { BarChart3, DollarSign, Download, Eye, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DevQuickStat as DashboardQuickStat } from "@/lib/dev/dashboard";

import DevQuickStat from "./DevQuickStat";

export interface DashboardStats {
  downloads: DashboardQuickStat;
  views: DashboardQuickStat;
  revenue: DashboardQuickStat;
  rating: DashboardQuickStat;
}

const statsSequence: (keyof DashboardStats)[] = ["downloads", "views", "revenue", "rating"];
const statIcons: Record<keyof DashboardStats, ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>> = {
  downloads: Download,
  views: Eye,
  revenue: DollarSign,
  rating: Star,
};

export default function DevDashboardStatisticsSection({ stats }: { stats: DashboardStats }) {
  return (
    <div>
      <div className="mb-6 flex justify-between border-b-1">
        <h2 className="text-foreground font-ludus-pixelify-sans text-xl">Estatísticas Rápidas</h2>
        <Button variant="link" size="sm" className="text-foreground" disabled>
          <BarChart3 className="h-4 w-4" />
          <span>
            Ver Relatório <span className="hidden md:inline">Completo</span>
          </span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsSequence.map((key, index) => {
          const Icon = statIcons[key];
          return <DevQuickStat key={index} icon={Icon} stat={stats[key]} />;
        })}
      </div>
    </div>
  );
}
