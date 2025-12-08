"use client";
import React, { useContext, useEffect, useState } from "react";

import { generateChatBotInitialMessages, sendMessageToChatBot } from "@/lib/bot/chat";
import { ChatBotReplyDTO } from "@/lib/bot/chat/chat-bot.dto";
import { ChatBotContextData, ChatBotMessage } from "@/lib/bot/chat/chat-bot.type";

const ChatBotContext = React.createContext<ChatBotContextData | undefined>(undefined);

export function ChatBotProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [history, setHistory] = useState<ChatBotMessage[]>(generateChatBotInitialMessages());

  useEffect(() => {
    if (history.length === 0) return;

    const lastMessage = history[history.length - 1];
    if (lastMessage.role !== "user") return;

    if (loading) return;
    setLoading(true);

    if (history.filter((m) => m.role === "user").length > (process.env.NODE_ENV === "development" ? 2 : 8)) {
      setHistory([
        ...history,
        {
          role: "assistant",
          content:
            "Perdão, mas esta é uma versão de **demonstração**. Em breve o chatbot será liberado em sua **potência máxima**!",
        },
      ]);
      setLoading(false);
      return;
    }

    sendMessageToChatBot(history)
      .then((res: ChatBotReplyDTO) => setHistory((current) => [...current, { role: "assistant", content: res.reply }]))
      .catch((e) =>
        setHistory((current) => [
          ...current,
          {
            role: "assistant",
            content: "Perdão, mas o Ludus não está sentindo muito bem agora. Tente novamente mais tarde",
          },
        ]),
      );
    setLoading(false);
  }, [history, loading]);

  const sendMessage = (content: string) => setHistory((current) => [...current, { role: "user", content }]);

  const clear = () => setHistory(generateChatBotInitialMessages());

  const data: ChatBotContextData = {
    opened,
    setOpened,
    messages: history,
    clear,
    sendMessage,
    loading,
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
