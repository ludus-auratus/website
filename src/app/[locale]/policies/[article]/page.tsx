import { PoliciesContent } from "@/components/pages/policies/PoliciesContent";
import { cn } from "@/lib/utils/shadcn";

export default function PoliciesPage() {
  return (
    <main
      className={cn(
        "px-8 py-4",
        "[&_h1]:text-3xl",
        "[&_h2]:text-2xl",
        "[&_h3]:text-xl",
        "[&_h4]:text-lg",
        "[&_h5]:text-md",
        "[&_h6]:text-sm",
        "[&_a]:text-muted-foreground [&_a]:hover:underline",
        "[&_ul]:list-inside [&_ul]:list-disc",
        "[&_ol]:list-inside [&_ol]:list-decimal",
      )}
    >
      <PoliciesContent />
    </main>
  );
}
