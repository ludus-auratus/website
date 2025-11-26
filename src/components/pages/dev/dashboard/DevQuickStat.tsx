import { ForwardRefExoticComponent } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DevQuickStat as DashboardQuickStat } from "@/lib/dev/dashboard";

export default function DevQuickStat({
  icon,
  stat,
}: {
  icon: ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  stat: DashboardQuickStat;
}) {
  const Icon = icon;
  return (
    <Card className="border-border hover:border-accent border-2 p-6 transition-all duration-300">
      <div className="mb-4 flex items-start justify-between">
        <div className="bg-accent/10 flex h-12 w-12 items-center justify-center rounded-xl">
          <Icon className="text-accent h-6 w-6" />
        </div>
        <Badge
          variant="secondary"
          className={`${stat.trend === "up" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
        >
          {stat.change}
        </Badge>
      </div>
      <div>
        <p className="text-muted-foreground mb-1 text-sm">{stat.label}</p>
        <p className="text-foreground font-ludus-pixelify-sans text-2xl">{stat.value}</p>
      </div>
    </Card>
  );
}
