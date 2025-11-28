"use client";
import React, { useContext, useState } from "react";

import { ChatBotContextData } from "@/lib/bot/chat/chat-bot.type";

const ChatBotContext = React.createContext<ChatBotContextData | undefined>(undefined);

export function ChatBotProvider({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);

  const data: ChatBotContextData = {
    opened,
    setOpened,
  };

  return <ChatBotContext.Provider value={data}>{children}</ChatBotContext.Provider>;
}

export function useChatBot(): ChatBotContextData {
  const context = useContext(ChatBotContext);

  if (context === undefined) {
    throw new Error("useChatBot deve ser usado dentro de um ChatBotProvider");
  }

  return context;
}
