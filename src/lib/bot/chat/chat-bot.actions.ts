"use server";

import { ChatBotReplyDTO, ChatBotTextingDTO } from "./chat-bot.dto";
import { ChatBotMessage } from "./chat-bot.type";

export async function sendMessageToChatBot(messages: ChatBotMessage[]): Promise<ChatBotReplyDTO> {
  const req: ChatBotTextingDTO = { messages };

  const res = await fetch("https://ludusiaapp.kindglacier-b288df83.brazilsouth.azurecontainerapps.io/chat/send", {
    body: JSON.stringify(req),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
}
