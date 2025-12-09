import { Separator } from "@/components/ui/separator";

export function DevModalSectionTitle({ text }: { text: string }) {
  return (
    <div>
      <h4 className="text-accent">{text}</h4>
      <Separator className="mb-2" />
    </div>
  );
}
