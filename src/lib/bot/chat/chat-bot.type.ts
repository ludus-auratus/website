export interface ChatBotContextData {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  messages: ChatBotMessage[];
  sendMessage: (content: string) => void;
  clear: () => void;
  loading: boolean;
}

export interface ChatBotMessage {
  role: ChatBotMessageAuthor;
  content: string;
}

export type ChatBotMessageAuthor = "user" | "assistant";
