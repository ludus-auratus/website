"use server";

import { getLocale } from "next-intl/server";

import { ChatBotReplyDTO, ChatBotTextingDTO } from "./chat-bot.dto";
import { ChatBotMessage } from "./chat-bot.type";

export async function sendMessageToChatBot(messages: ChatBotMessage[]): Promise<ChatBotReplyDTO> {
  const currentLanguage = await getLocale();
  const req: ChatBotTextingDTO = {
    messages: [
      {
        role: "assistant",
        content: `Atualmente, o site está utilizando o idioma ${currentLanguage}. No entando, caso o usuário escreva alguma mensagem em outro idioma, responda de acordo com o idioma escolhido pelo usuário.`,
      },
      ...messages,
    ],
  };

  const res = await fetch("https://ludusiaapp.kindglacier-b288df83.brazilsouth.azurecontainerapps.io/chat/send", {
    body: JSON.stringify(req),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
}
