"use client";

import Navbar from "@/components/Layout/Navbar";
import { useI18n } from "@/contexts/I18nContext";
import HomeHero from "@/components/home"
import FeatureCard from "@/components/card"
import heroJpg from "@/images/human-robot-handshake-collaboration-digital-age.jpg"
export default function Home() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20">
      {/* Navigation */}
      <Navbar />
      <HomeHero />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <FeatureCard
          title="Holistic Approach"
          description="We combine strategic consulting with practical robotics implementation to deliver measurable impact."
          imageSrc={heroJpg.src}
        />
      </div>
    </div>
  );
}
