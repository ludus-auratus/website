"use client";

import { useSession } from "next-auth/react";

import { NavbarAuthButtons } from "@/components/layout/Navbar/NavbarAuthButtons";

export default function Page() {
  const session = useSession();
  return (
    <div>
      <p>{JSON.stringify(session, null, 2)}</p>
      <NavbarAuthButtons />
    </div>
  );
}
