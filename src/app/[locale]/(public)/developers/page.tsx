"use client";

import { Headphones, Rocket } from "lucide-react";

import { DevelopersComponents } from "@/components/pages/developers";
import { Button } from "@/components/ui/button";

interface DevelopersPageProps {
  onBack: () => void;
  onStartClick?: () => void;
  onDocsClick?: () => void;
}

export default function DevelopersPage({ onStartClick }: DevelopersPageProps) {
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
