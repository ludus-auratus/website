import { ChatBotMessage } from "./chat-bot.type";

export interface ChatBotTextingDTO {
  messages: ChatBotMessage[];
}

export interface ChatBotReplyDTO {
  reply: string;
}
