import { CircleQuestionMark } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/shadcn";

export function QuestionTooltip({ text, className }: { text: string; className?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <CircleQuestionMark className={cn("ml-1 inline h-4 w-4", className)}></CircleQuestionMark>
      </TooltipTrigger>
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  );
}
