import { ChatBotMessageAuthor } from "@/lib/bot/chat/chat-bot.type";
import { cn } from "@/lib/utils/shadcn";

export function ChatBotMessage({ author, children }: { author: ChatBotMessageAuthor; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "border-border w-fit max-w-4/5 rounded-md border-1 p-2 text-sm",
        author === "user" ? "ml-auto bg-transparent" : "bg-border",
      )}
    >
      {children}
    </div>
  );
}
