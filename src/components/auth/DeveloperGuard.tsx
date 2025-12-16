"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export function DeveloperGuard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated() || !user?.isDeveloper)) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated() || !user?.isDeveloper) {
    return null;
  }
}
