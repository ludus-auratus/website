import { ChatBotModal } from "./ChatBotModal";
import ChatBotRoot from "./ChatBotRoot";
import ChatBotTrigger from "./ChatBotTrigger";

export function ChatBot() {
  return (
    <ChatBotRoot>
      <ChatBotModal />
      <ChatBotTrigger />
    </ChatBotRoot>
  );
}
