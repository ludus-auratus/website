import { DevelopersComponents } from "@/components/pages/developers";

export default function DevelopersPage() {
  return (
    <div className="bg-background min-h-screen">
      <DevelopersComponents.Presentation />

      <DevelopersComponents.Benefits />

      <DevelopersComponents.HowItWorks />

      <DevelopersComponents.CTA />

      <DevelopersComponents.FAQ />
    </div>
  );
}
