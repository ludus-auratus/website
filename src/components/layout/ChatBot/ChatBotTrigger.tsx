import Image from "next/image";

import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

export default function ChatBotTrigger() {
  return (
    <DialogTrigger asChild>
      <Button variant={"link"} className={"h-fit w-fit rounded-full p-0"}>
        <Image
          src="/images/ludus/logo-marginless.png"
          alt="Logo da Ludus para abrir o canal de atendimento do chat bot"
          width={256}
          height={256}
          className="h-16 w-16 object-cover md:h-20 md:w-20"
        />
      </Button>
    </DialogTrigger>
  );
}
