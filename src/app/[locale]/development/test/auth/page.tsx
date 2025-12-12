"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function Page() {
  const session = useSession();
  return (
    <div>
      <p>{JSON.stringify(session, null, 2)}</p>
      <Button onClick={() => signIn()}>Sign In</Button>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
