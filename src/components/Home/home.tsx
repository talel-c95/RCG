"use client";

import { useI18n } from "@/contexts/I18nContext";
import { SplineScene } from "@/components/ui/spline-scene";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import WhyChooseUs from "./WhyChooseUs";

const HomeHero = () => {
  const { t } = useI18n();

  return (
    <>
      {/* Original Hero Section */}
      <section id="home" className="relative w-full h-screen overflow-hidden">
        <Card className="w-full h-full border-0 rounded-none relative overflow-hidden" style={{ backgroundColor: 'hsl(240 10% 4%)' }}>
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          <div className="flex flex-col md:flex-row h-full">
            {/* Left content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center flex-1">
              <div className="max-w-2xl text-left text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight hero-title-reveal">
                  {t("home.heroTitle")}
                </h1>
                <p className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-cyan-400 hero-strategy-reveal">
                  <span className="inline-block hero-strategy-glow">
                    {t("home.heroStrategyWord")}
                  </span>
                </p>
                <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed hero-paragraph-reveal">
                  {t("home.heroDescription")}
                </p>
              </div>
            </div>

            {/* Right content - 3D Robot */}
            <div className="flex-1 relative min-h-[400px] md:min-h-0">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />
    </>
  );
};

export default HomeHero;
