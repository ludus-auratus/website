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
    <Card className="border-accent/45 border-b-accent/15 border-t-accent/75 bg-accent/10 hover:bg-accent/10 hover:border-accent flex flex-row items-center gap-2 border-2 p-3 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="bg-accent/10 flex h-12 w-12 items-center justify-center rounded-xl">
          <Icon className="text-accent h-6 w-6" />
        </div>
      </div>
      <div>
        <p className="text-muted-foreground text-sm">
          <span className="mr-2">{stat.label}</span>
          <Badge
            className={`${stat.trend === "up" ? "text-background bg-highlight" : "text-destructive-foreground bg-destructive"}`}
          >
            {stat.change}
          </Badge>
        </p>
        <p className="text-foreground text-2xl">{stat.value}</p>
      </div>
    </Card>
  );
}
