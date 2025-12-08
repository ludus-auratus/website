import { Dialog } from "@/components/ui/dialog";

export default function ChatBotRoot({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <div className="fixed right-2 bottom-1 flex flex-col items-end md:right-5 md:bottom-3">{children}</div>{" "}
    </Dialog>
  );
}
