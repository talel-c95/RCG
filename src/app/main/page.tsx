"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Layout/Navbar";
import HomeHero from "@/components/Home/home";

// Lazy load below-the-fold components
const IndustriesPage = dynamic(() => import("@/app/Industries/page"), {
  loading: () => <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
});

const ServicesPage = dynamic(() => import("@/app/Services/page"), {
  loading: () => <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
});

const AboutPage = dynamic(() => import("@/app/About/page"), {
  loading: () => <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
});

const FAQPage = dynamic(() => import("@/app/FQA/page"), {
  loading: () => <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
});

const Footer = dynamic(() => import("@/components/Layout/Footer"), {
  loading: () => <div className="h-32 bg-surface animate-pulse"></div>
});

export default function MainPage() {
  useEffect(() => {
    // Mark that preloader was shown in this session
    sessionStorage.setItem('preloaderShown', 'true');
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20 overflow-x-hidden">
      <Navbar />
      
      <section id="home">
        <HomeHero />
      </section>

      {/* Industries Section */}
      <section id="Industries">
        <IndustriesPage />
      </section>
      
      <section id="About">
        <AboutPage />
      </section>
      
      <section id="Services">
        <ServicesPage />
      </section>

      <section id="FQA">
        <FAQPage />
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
