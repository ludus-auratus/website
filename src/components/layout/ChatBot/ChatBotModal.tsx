"use client";

import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import Image from "next/image";
import { Send, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { ThreeDots } from "@/components/ui/three-dots";
import { useChatBot } from "@/context/ChatBotContext";

import { ChatBotMessage } from "./ChatBotMessage";

export function ChatBotModal() {
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const { messages, sendMessage, loading, clear } = useChatBot();

  const handleMessageSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    if (userMessage && userMessage.length > 0) {
      sendMessage(userMessage);
      setUserMessage("");
    }
  };

  const handleChatReset = () => {
    clear();
    setUserMessage("");
    setPopoverOpened(false);
  };

  const scrollToChatBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToChatBottom();
  }, [messages]);

  return (
    <DialogContent
      className={"overflow-hidden px-2 transition-all md:w-128 xl:translate-x-32 xl:px-5 2xl:translate-x-1/2"}
    >
      <div className="flex h-full w-full flex-col">
        <DialogHeader className="text-foreground border-border flex gap-4 border-b-1 pb-3 md:flex-row md:items-center">
          <div className="mx-auto h-16 w-16 flex-none md:mx-0">
            <Image
              src="/images/ludus/logo-marginless.png"
              alt="Logo da ludus como foto de perfil para o Ludus IA"
              width={128}
              height={128}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <DialogTitle>Ludus IA</DialogTitle>
            <DialogDescription>Seu assistente virtual para tirar dúvidas</DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex h-full flex-col">
          <div className="h-92 overflow-y-auto py-3 pr-2">
            <div className="flex h-fit justify-end">
              <div className="mt-auto w-full space-y-2">
                {messages.map((message, index) =>
                  message.role === "assistant" ? (
                    message.content.split("\n\n").map((segment, subindex) => (
                      <ChatBotMessage key={`${index}-${subindex}`} author={message.role} showAuthor={subindex === 0}>
                        <Markdown>{segment}</Markdown>
                      </ChatBotMessage>
                    ))
                  ) : (
                    <ChatBotMessage key={index} author={message.role} showAuthor>
                      <Markdown>{message.content}</Markdown>
                    </ChatBotMessage>
                  ),
                )}
                {loading && (
                  <ChatBotMessage author="assistant">
                    <ThreeDots className="h-4 items-end" />
                  </ChatBotMessage>
                )}
                <div ref={chatBottomRef} />
              </div>
            </div>
          </div>
          <form className="border-border relative flex w-full gap-2 border-t-1 pt-3" onSubmit={handleMessageSubmit}>
            <Textarea
              placeholder="Digite uma mensagem..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              disabled={loading}
              className="h-full w-full resize-none wrap-anywhere"
            />
            <div className="absolute -top-3 right-0 flex -translate-y-full gap-2 xl:left-0 2xl:static 2xl:translate-0 2xl:flex-col">
              <Button className="h-10 w-10" type="submit" disabled={loading}>
                <Send />
              </Button>
              <Popover open={popoverOpened} onOpenChange={setPopoverOpened}>
                <PopoverTrigger asChild>
                  <Button className="h-10 w-10" variant={"destructive"} type="reset" disabled={loading}>
                    <Trash />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-fit" align="end">
                  <h5>Limpar conversa?</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant={"destructive"} onClick={handleChatReset}>
                      Sim
                    </Button>
                    <Button variant={"outline"} onClick={() => setPopoverOpened(false)}>
                      Não
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </form>
        </div>
      </div>
    </DialogContent>
  );
}
