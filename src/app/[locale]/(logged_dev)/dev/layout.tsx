import DevHeader from "@/components/pages/dev/DevHeader";
import DevSidebar from "@/components/pages/dev/DevSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DevProvider } from "@/context/DevContext";

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <DevProvider>
      <SidebarProvider>
        <div className="flex max-h-screen min-h-screen w-full overflow-y-clip">
          <DevSidebar />
          <div className="flex w-full flex-col">
            <DevHeader section={{ id: "dashboard" }} />
            <div className="h-full overflow-y-auto">
              <main className="space-y-10 p-5 lg:px-20 lg:py-12">{children}</main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </DevProvider>
  );
}
