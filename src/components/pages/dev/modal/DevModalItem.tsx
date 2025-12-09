import { QuestionTooltip } from "@/components/layout/Tooltip/QuestionTooltip";
import { cn } from "@/lib/utils/shadcn";

export function DevModalItem({
  title,
  content,
  tooltip,
  className,
}: {
  title: string;
  content: unknown;
  tooltip?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h5 className="text-muted-foreground text-sm">
        <span>{title}</span>
        {tooltip && <QuestionTooltip text={tooltip} />}
      </h5>
      <p className="text-foreground">{`${content}`}</p>
    </div>
  );
}
