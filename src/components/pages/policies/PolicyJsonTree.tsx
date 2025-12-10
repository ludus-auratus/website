import { Button } from "@/components/ui/button";

export function PoliceJsonTree({
  id,
  prefix,
  tree,
  disabled,
  onClick,
}: {
  id: string;
  prefix: string;
  tree: Record<string, unknown>;
  disabled?: boolean;
  onClick: (id: string) => void;
}) {
  return (
    <div>
      <Button variant={"link"} onClick={() => onClick(`${prefix}.${id}`)} disabled={disabled}>
        {id}
      </Button>
      <div className="ml-4 border-b-1 border-l-1 pb-1">
        {Object.keys(tree)
          .filter((k) => !(k.startsWith("__") && k.endsWith("__")))
          .map((key, index) => (
            <PoliceJsonTree
              key={index}
              id={key}
              prefix={`${prefix}.${id}`}
              tree={tree[key] as Record<string, unknown>}
              onClick={onClick}
            />
          ))}
      </div>
    </div>
  );
}
