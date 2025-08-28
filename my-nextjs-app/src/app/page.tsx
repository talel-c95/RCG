"use client";

import Navbar from "@/components/Layout/Navbar";
import { useI18n } from "@/contexts/I18nContext";
import HomeHero from "@/components/Home/home";
import IndustriesPage from "@/app/Industries/page";
import ServicesPage from "@/app/Services/page";
import Footer from "@/components/Layout/Footer";
import AboutPage from "@/app/About/page";

export default function Home() {
  const { t } = useI18n();

  const handleCtaClick = () => {
    console.log("CTA clicked!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20">
      <Navbar />
      
      <section id="home">
        <HomeHero />
      </section>

      {/* Industries Section */}
      <section id="industries">
        <IndustriesPage />
      </section>
      
      <section id="about">
        <AboutPage />
      </section>
      
      <section id="services">
        <ServicesPage />
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
