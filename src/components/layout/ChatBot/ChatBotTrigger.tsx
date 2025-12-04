import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useChatBot } from "@/context/ChatBotContext";

export default function ChatBotTrigger() {
  const { setOpened } = useChatBot();

  const onClick = () => {
    setOpened((v) => !v);
  };

  return (
    <Button variant={"link"} className={"h-22 w-22 md:h-24 md:w-24"} onClick={onClick}>
      <Image
        src="/images/ludus/logo-marginless.png"
        alt="Logo da Ludus para abrir o canal de atendimento do chat bot"
        width={128}
        height={128}
      />
    </Button>
  );
}
