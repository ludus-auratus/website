import Markdown from "react-markdown";

import { cn } from "@/lib/utils/shadcn";

export function FormattedMarkdown({ children }: { children: string }) {
  return (
    <div
      className={cn(
        "px-8 py-4",
        "[&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-semibold",
        "[&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold",
        "[&_h3]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold",
        "[&_h4]:mb-4 [&_h4]:text-lg [&_h4]:font-semibold",
        "[&_h5]:text-md [&_h5]:mb-4 [&_h5]:font-semibold",
        "[&_h6]:mb-4 [&_h6]:text-sm [&_h6]:font-semibold",
        "[&_p]:mb-2",
        "[&_a]:text-muted-foreground [&_a]:hover:underline",
        "[&_ul]:list-inside [&_ul]:list-disc",
        "[&_ol]:list-inside [&_ol]:list-decimal",
        "[&_hr]:my-8",
      )}
    >
      <Markdown>{children}</Markdown>
    </div>
  );
}
