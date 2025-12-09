"use client";

import * as DOMPurifyModule from "dompurify";
const DOMPurify = DOMPurifyModule.default || DOMPurifyModule;

import { cn } from "@/lib/utils/shadcn";

interface RenderHtmlProps {
  conteudo: string;
  className?: string;
}

export default function RenderHtml({ conteudo, className }: RenderHtmlProps) {
  const safeHTML = typeof window !== "undefined" ? DOMPurify.sanitize(conteudo) : conteudo;

  return (
    <div
      className={cn(
        "prose prose-sm sm:prose-base dark:prose-invert prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:my-2 w-full max-w-none break-all outline-none",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: safeHTML }}
    />
  );
}
