import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProfileHeader } from "@/components/pages/profile/ProfileHeader";

import { ProfileTabs } from "./tabs";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <ProfileHeader />
          <ProfileTabs />
          <div className="mt-6">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
