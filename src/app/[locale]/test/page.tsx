import { Button } from "@/components/ui/button";

export default function Page() {
  const variants: ("default" | "secondary" | "destructive" | "ghost" | "outline" | "link")[] = [
    "default",
    "secondary",
    "destructive",
    "ghost",
    "outline",
    "link",
  ];
  return (
    <div className="m-auto flex gap-2">
      <div className="flex flex-col gap-2">
        {variants.map((v) => (
          <Button key={v} variant={v}>
            {v.slice(0, 1).toUpperCase() + v.slice(1)}
          </Button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {variants.map((v) => (
          <Button key={v} variant={v} disabled>
            {v.slice(0, 1).toUpperCase() + v.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
}
