import { redirect } from "next/navigation";

export default function DevelopmentLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") redirect("/404");
  return <>{children}</>;
}
