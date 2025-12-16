"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { DetailedSession } from "@/lib/auth";

export function AuthProtector({ devOnly, children }: { devOnly?: boolean; children?: React.ReactNode }) {
  const session = useSession();
  const { status } = session;
  const data = session.data as DetailedSession;
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "loading") {
      return;
    }

    if (devOnly && !data.user.isDeveloper) {
      router.replace("/404");
      return;
    }
  }, [data, router, devOnly, status]);

  return status === "loading" ? null : <>{children}</>;
}
