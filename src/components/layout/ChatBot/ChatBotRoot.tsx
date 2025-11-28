export default function ChatBotRoot({ children }: { children: React.ReactNode }) {
  return <div className="absolute right-8 bottom-8 flex flex-col items-end">{children}</div>;
}
