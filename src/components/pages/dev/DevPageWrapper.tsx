import DevSidebar from "@/components/pages/dev/DevSidebar";
import { cn } from "@/lib/utils/shadcn";

import DevHeader from "./DevHeader";

export interface DevSection {
  id: string;
  message?: string;
}

export default function DevPageWrapper({
  children,
  section,
  childClassName,
}: {
  section: DevSection;
  children: React.ReactNode;
  childClassName?: string;
}) {
  return (
    <div className="flex max-h-screen">
      <DevSidebar current={section.id} />
      <div className="flex w-full flex-col">
        <DevHeader section={section} />
        <main className={cn("overflow-auto", childClassName)}>{children}</main>
      </div>
    </div>
  );
}
