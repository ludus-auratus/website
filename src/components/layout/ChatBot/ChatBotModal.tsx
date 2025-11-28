import { useChatBot } from "@/context/ChatBotContext";
import { cn } from "@/lib/utils/shadcn";

export function ChatBotModal() {
  const { opened } = useChatBot();

  return (
    <div className={cn("h-48 w-48 overflow-hidden transition-all", !opened && "h-0")}>
      <div className="h-full w-full rounded-md bg-red-500 p-4">CHAT BOT</div>
    </div>
  );
}
