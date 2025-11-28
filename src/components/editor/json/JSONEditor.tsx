"use client";
import { useState } from "react";
import { Clipboard, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ObjectInput } from "./ObjectInput";

export function JSONEditor<T extends object>({
  object,
  update,
  exporter,
  extension,
}: {
  object: T;
  update: (obj: T) => void;
  exporter?: (filename: string, object: T) => void;
  extension: string;
}) {
  const [filename, setFilename] = useState<string>("");

  return (
    <div className="grid grid-cols-2 gap-8 px-16 py-8">
      <div className="space-y-4">
        <div className="flex gap-x-2 overflow-hidden">
          <Button variant={"accent"} onClick={() => navigator.clipboard.writeText(JSON.stringify(object, null, 2))}>
            <Clipboard />
            Copy
          </Button>
          <div className="space-x-2">
            <Button
              variant={"destructive"}
              disabled={filename.length === 0}
              onClick={() => {
                const name = filename.split(".").slice(0, -1).join(".") + `.${extension}`;
                exporter?.(name, object);
              }}
            >
              <Upload />
              Export
            </Button>
            <input
              className="border-primary rounded-md border-1 p-2"
              placeholder="file_name"
              value={filename}
              onChange={(ev) => setFilename(ev.target.value)}
            />
          </div>
        </div>
        <div className="bg-ludus-green-950/50 h-full rounded-md p-4">
          <textarea
            readOnly
            className="h-full w-full resize-none"
            value={(() => {
              return JSON.stringify(
                object,
                (key, value) => {
                  if (value instanceof Date) {
                    const year = value.getUTCFullYear();
                    const month = value.getUTCMonth();
                    const day = value.getUTCDate();
                    return `${year}-${month}-${day}`;
                  }
                  return value;
                },
                2,
              );
            })()}
          ></textarea>
        </div>
      </div>
      <div className="w-100">
        <ObjectInput object={object} update={update} />
      </div>
    </div>
  );
}
