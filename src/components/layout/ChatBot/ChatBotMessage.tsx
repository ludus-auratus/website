import { ChatBotMessageAuthor } from "@/lib/bot/chat/chat-bot.type";
import { cn } from "@/lib/utils/shadcn";

export function ChatBotMessage({
  author,
  children,
  showAuthor = false,
}: {
  author: ChatBotMessageAuthor;
  children: React.ReactNode;
  showAuthor?: boolean;
}) {
  return (
    <div
      className={cn(
        "border-border w-fit max-w-4/5 rounded-md border-1 p-2",
        author === "user" ? "ml-auto bg-transparent" : "bg-border",
      )}
    >
      {showAuthor && <p className="text-foreground/50 text-xs">{author === "assistant" ? "Ludus IA" : "Você"}</p>}
      <div className="text-foreground/85 text-sm">{children}</div>
    </div>
  );
}
