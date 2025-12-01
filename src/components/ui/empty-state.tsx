import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/shadcn";

const EmptyState = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("mx-auto w-full max-w-7xl", className)} {...props}>
      <Card className="bg-card/50 border-border/50 border backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">{children}</CardContent>
      </Card>
    </div>
  ),
);
EmptyState.displayName = "EmptyState";

interface EmptyStateIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ElementType;
}

const EmptyStateIcon = React.forwardRef<HTMLDivElement, EmptyStateIconProps>(
  ({ className, icon: Icon, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("bg-primary/10 mb-6 inline-flex h-24 w-24 items-center justify-center rounded-3xl", className)}
      {...props}
    >
      <Icon className="text-primary h-12 w-12" />
    </div>
  ),
);
EmptyStateIcon.displayName = "EmptyStateIcon";

const EmptyStateTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("font-ludus-pixelify-sans mb-4 text-2xl md:text-3xl", className)} {...props} />
  ),
);
EmptyStateTitle.displayName = "EmptyStateTitle";

const EmptyStateDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-muted-foreground mx-auto mb-8 max-w-md", className)} {...props} />
  ),
);
EmptyStateDescription.displayName = "EmptyStateDescription";

const EmptyStateActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center justify-center gap-4", className)} {...props} />
  ),
);
EmptyStateActions.displayName = "EmptyStateActions";

export { EmptyState, EmptyStateActions, EmptyStateDescription, EmptyStateIcon, EmptyStateTitle };
