import DevHeader from "@/components/pages/dev/DevHeader";
import DevSidebar from "@/components/pages/dev/DevSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DevProvider } from "@/context/DevContext";

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <DevProvider>
      <SidebarProvider className="w-full">
        <div className="flex min-h-screen w-full">
          <DevSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <DevHeader section={{ id: "dashboard" }} />
            <main className="flex-1 space-y-8 p-5 lg:px-20 lg:py-8">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </DevProvider>
  );
}
