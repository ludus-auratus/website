"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils/shadcn";

const buttonVariants = cva(
  "cursor-pointer w-6 h-6 font-ludus-pixelify-sans disabled:text-muted-foreground disabled:pointer-events-none transition-all",
  {
    variants: {
      opened: {
        true: "rotate-90",
        false: "rotate-180",
      },
    },
  },
);

const containerVariants = cva(
  "border-ludus-green-600 flex origin-top flex-wrap gap-2 rounded-md p-2 border-1 shadow-md shadow-black/25 transition-all overflow-hidden ",
  {
    variants: {
      visible: {
        true: "h-fit",
        false: "h-0 py-0",
      },
    },
  },
);
export function GameInfoAccordion({
  children,
  title,
  opened = false,
  disabled = false,
  containerClassName = "",
  translationNamespace,
}: {
  children: React.ReactNode;
  title: string;
  opened?: boolean;
  disabled?: boolean;
  containerClassName?: string;
  translationNamespace?: string;
}) {
  const [open, setOpen] = useState(opened && !disabled);
  const t = useTranslations(["Game.info", translationNamespace].filter((t) => t).join("."));

  const onOpenButtonClick = () => {
    setOpen((current) => !current);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h4 className="font-ludus-pixelify-sans text-shadow-black/25 text-shadow-sm">{t(title)}</h4>
        <button className={buttonVariants({ opened: open })} onClick={onOpenButtonClick} disabled={disabled}>
          {disabled ? "-" : ">"}
        </button>
      </div>
      <div className={cn(containerVariants({ visible: open }), containerClassName)}>{children}</div>
    </div>
  );
}
