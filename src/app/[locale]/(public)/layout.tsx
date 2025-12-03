"use client";

import { ChatBot } from "@/components/layout/ChatBot/ChatBot";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ChatBotProvider } from "@/context/ChatBotContext";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ChatBotProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatBot />
      </ChatBotProvider>
    </>
  );
}
