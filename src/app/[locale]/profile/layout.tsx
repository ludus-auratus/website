import Link from "next/link";
import { Library, ShoppingBag } from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProfileHeader } from "@/components/pages/profile/ProfileHeader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <ProfileHeader />

          <Tabs defaultValue="library" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="library" asChild>
                <Link href="/profile/my-library">
                  <Library className="mr-2 h-4 w-4" />
                  Biblioteca
                </Link>
              </TabsTrigger>

              <TabsTrigger value="purchases" asChild>
                <Link href="/profile/purchases">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Compras
                </Link>
              </TabsTrigger>
            </TabsList>

            {children}
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}
