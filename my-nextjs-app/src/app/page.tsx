"use client";

import Navbar from "@/components/Layout/Navbar";
import { useI18n } from "@/contexts/I18nContext";

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20">
      {/* Navigation */}
      <Navbar />

      {/* Main Content with proper spacing for fixed navbar */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-highlight to-accent bg-clip-text text-transparent">
              {t("welcome")}
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              {t("heroSubtitle")}
            </p>
          </div>
        </section>

        {/* Industry Section */}
        <section id="industry" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              {t("industryTitle")}
            </h2>
            <p className="text-lg text-foreground/70">
              {t("industrySubtitle")}
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              {t("servicesTitle")}
            </h2>
            <p className="text-lg text-foreground/70">
              {t("servicesSubtitle")}
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              {t("aboutTitle")}
            </h2>
            <p className="text-lg text-foreground/70">
              {t("aboutSubtitle")}
            </p>
          </div>
        </section>

        {/* Robots Section */}
        <section id="robots" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              {t("robotsTitle")}
            </h2>
            <p className="text-lg text-foreground/70">
              {t("robotsSubtitle")}
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              {t("faqTitle")}
            </h2>
            <p className="text-lg text-foreground/70">
              {t("faqSubtitle")}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              {t("contactTitle")}
            </h2>
            <p className="text-lg text-foreground/70">
              {t("contactSubtitle")}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
