"use client";

import { useEffect } from "react";
import Navbar from "@/components/Layout/Navbar";
import HomeHero from "@/components/Home/home";
import IndustriesPage from "@/app/Industries/page";
import ServicesPage from "@/app/Services/page";
import Footer from "@/components/Layout/Footer";
import AboutPage from "@/app/About/page";
import FAQPage from "@/app/FQA/page";

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
