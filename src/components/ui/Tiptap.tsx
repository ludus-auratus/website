"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FaBold, FaHeading, FaItalic, FaListOl, FaListUl, FaUnderline } from "react-icons/fa";

import { cn } from "@/lib/utils/shadcn";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Button } from "./button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

export interface TiptapRef {
  focus: () => void;
}

interface TiptapProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  isInvalid?: boolean;
}

const Tiptap = forwardRef<TiptapRef, TiptapProps>(({ value, onChange, onBlur, isInvalid }, ref) => {
  const [headingLevel, setHeadingLevel] = useState("p");

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base dark:prose-invert prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:my-2 w-full max-w-none break-all outline-none",
      },
    },
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onBlur: () => {
      onBlur?.();
    },
    onSelectionUpdate: ({ editor }) => {
      if (editor.isActive("heading", { level: 1 })) return setHeadingLevel("1");
      if (editor.isActive("heading", { level: 2 })) return setHeadingLevel("2");
      if (editor.isActive("heading", { level: 3 })) return setHeadingLevel("3");
      if (editor.isActive("heading", { level: 4 })) return setHeadingLevel("4");
      if (editor.isActive("heading", { level: 5 })) return setHeadingLevel("5");
      if (editor.isActive("heading", { level: 6 })) return setHeadingLevel("6");
      setHeadingLevel("p");
    },
  });

  useImperativeHandle(ref, () => ({
    focus: () => {
      editor?.chain().focus().run();
    },
  }));

  // Handle external value changes (e.g. form reset)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex max-w-full flex-col gap-2">
      <div
        aria-invalid={isInvalid}
        className={cn(
          "selection:bg-primary selection:text-primary-foreground border-border bg-input-background focus-within:border-ring focus-within:ring-ring/50 flex min-h-[150px] w-full min-w-0 flex-col overflow-hidden rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] focus-within:ring-[3px] hover:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "dark:bg-input/30",
        )}
      >
        {/* Toolbar */}
        <div className="border-border bg-muted/30 flex flex-wrap items-center gap-1 border-b p-2">
          <Select
            value={headingLevel}
            onValueChange={(value) => {
              setHeadingLevel(value);
              if (value === "p") {
                editor.chain().focus().setParagraph().run();
              } else {
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: Number(value) as 1 | 2 | 3 | 4 | 5 | 6 })
                  .run();
              }
            }}
          >
            <SelectTrigger className="h-8 w-[130px] border-none bg-transparent shadow-none focus:ring-0">
              <div className="flex items-center gap-2">
                <FaHeading className="size-3" />
                <SelectValue placeholder="Paragraph" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="p">Paragraph</SelectItem>
              <SelectItem value="1">Heading 1</SelectItem>
              <SelectItem value="2">Heading 2</SelectItem>
              <SelectItem value="3">Heading 3</SelectItem>
              <SelectItem value="4">Heading 4</SelectItem>
              <SelectItem value="5">Heading 5</SelectItem>
              <SelectItem value="6">Heading 6</SelectItem>
            </SelectContent>
          </Select>

          <div className="bg-border mx-1 h-4 w-px" />

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn("h-8 w-8", editor.isActive("bold") ? "bg-accent text-accent-foreground" : "")}
            title="Bold"
          >
            <FaBold className="h-3 w-3" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn("h-8 w-8", editor.isActive("italic") ? "bg-accent text-accent-foreground" : "")}
            title="Italic"
          >
            <FaItalic className="h-3 w-3" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn("h-8 w-8", editor.isActive("underline") ? "bg-accent text-accent-foreground" : "")}
            title="Underline"
          >
            <FaUnderline className="h-3 w-3" />
          </Button>

          <div className="bg-border mx-1 h-4 w-px" />

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn("h-8 w-8", editor.isActive("bulletList") ? "bg-accent text-accent-foreground" : "")}
            title="Bullet List"
          >
            <FaListUl className="h-3 w-3" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn("h-8 w-8", editor.isActive("orderedList") ? "bg-accent text-accent-foreground" : "")}
            title="Ordered List"
          >
            <FaListOl className="h-3 w-3" />
          </Button>
        </div>

        <EditorContent editor={editor} className="flex-1 p-3" />
      </div>
    </div>
  );
});

Tiptap.displayName = "Tiptap";

export default Tiptap;
