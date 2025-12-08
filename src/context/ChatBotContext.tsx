"use client";
import React, { useContext, useEffect, useState } from "react";

import { generateChatBotInitialMessages } from "@/lib/bot/chat";
import { ChatBotReplyDTO, ChatBotTextingDTO } from "@/lib/bot/chat/chat-bot.dto";
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

    const req: ChatBotTextingDTO = {
      messages: history,
    };

    if (loading) return;
    setLoading(true);

    if (history.filter((m) => m.role === "user").length > 8) {
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

    fetch("https://ludusiaapp.kindglacier-b288df83.brazilsouth.azurecontainerapps.io/chat/send", {
      body: JSON.stringify(req),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) =>
        res.json().then((dto: ChatBotReplyDTO) => {
          setHistory((current) => [...current, { role: "assistant", content: dto.reply }]);
          setLoading(false);
        }),
      )
      .catch(() => {
        setHistory((current) => [...current, { role: "assistant", content: "Desculpe, mas estamos com problemas" }]);
        setLoading(false);
      });
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
