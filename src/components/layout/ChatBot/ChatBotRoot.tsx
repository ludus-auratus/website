export default function ChatBotRoot({ children }: { children: React.ReactNode }) {
  return <div className="fixed right-4 bottom-2 flex flex-col items-end">{children}</div>;
}
