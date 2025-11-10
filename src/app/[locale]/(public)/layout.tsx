import { Navbar } from "@/components/layout/Navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="h-[calc(100dvh - 4rem)] flex-1"> {children}</main>
    </>
  );
}
