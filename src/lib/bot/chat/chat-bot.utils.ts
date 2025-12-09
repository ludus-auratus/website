import { ChatBotMessage } from "./chat-bot.type";

export function generateChatBotInitialMessages(): ChatBotMessage[] {
  return [{ role: "assistant", content: "Olá, tudo bem?\n\nEu sou o Ludus, como posso ajudar?" }];
}
