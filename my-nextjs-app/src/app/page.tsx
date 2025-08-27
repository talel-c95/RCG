"use client";

import Navbar from "@/components/Layout/Navbar";
import { useI18n } from "@/contexts/I18nContext";
import HomeHero from "@/components/home";

export default function Home() {
  const { t } = useI18n();

  const handleCtaClick = () => {
    console.log("CTA clicked!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20">
      <Navbar />
      <HomeHero />
    </div>
  );
}
