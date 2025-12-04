export default function ChatBotRoot({ children }: { children: React.ReactNode }) {
  return <div className="fixed right-2 bottom-1 flex flex-col items-end md:right-4 md:bottom-2">{children}</div>;
}
