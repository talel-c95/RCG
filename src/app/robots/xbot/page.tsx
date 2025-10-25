"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import Image from "next/image";
import { useNavigation } from "@/hooks/useNavigation";
import { useI18n } from "@/contexts/I18nContext";

// Custom hook for line-by-line animation
function useLineAnimation(delay: number = 0) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedLines, setAnimatedLines] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const startAnimation = useCallback(() => {
    if (isVisible) return;
    setIsVisible(true);
    
    // Animate lines one by one with staggered timing
    const lines = ref.current?.querySelectorAll('[data-line]') || [];
    lines.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedLines(prev => [...prev, index]);
      }, delay + (index * 200)); // 200ms delay between each line
    });
  }, [isVisible, delay]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          startAnimation();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -100px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible, startAnimation]);

  return { ref, animatedLines, isVisible };
}



// Component for single animated text element
function AnimatedText({ 
  text, 
  delay = 0, 
  className = "",
  tag: Tag = "h2"
}: {
  text: string;
  delay?: number;
  className?: string;
  tag?: string;
}) {
  const { ref } = useLineAnimation(delay);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -100px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible, ref]);

  const renderElement = () => {
    const elementClass = `transform transition-all duration-700 ease-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    } ${className}`;

    switch (Tag) {
      case "h1":
        return <h1 ref={ref as React.RefObject<HTMLHeadingElement>} className={elementClass}>{text}</h1>;
      case "h2":
        return <h2 ref={ref as React.RefObject<HTMLHeadingElement>} className={elementClass}>{text}</h2>;
      case "h3":
        return <h3 ref={ref as React.RefObject<HTMLHeadingElement>} className={elementClass}>{text}</h3>;
      case "p":
        return <p ref={ref as React.RefObject<HTMLParagraphElement>} className={elementClass}>{text}</p>;
      default:
        return <h2 ref={ref as React.RefObject<HTMLHeadingElement>} className={elementClass}>{text}</h2>;
    }
  };

  return renderElement();
}

export default function RobotXbotPage() {
  const [, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { handleNavigation } = useNavigation();
  const { t } = useI18n();

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };
  const features = [
    {
      id: 1,
      title: t('robots.xbot.carousel.loadTitle'),
      description: t('robots.xbot.carousel.loadDesc'),
      image: "/images/xbot2.webp",
      alt: t('robots.xbot.carousel.loadTitle'),
    },
    {
      id: 2,
      title: t('robots.xbot.carousel.lidarTitle'),
      description: t('robots.xbot.carousel.lidarDesc'),
      image: "/images/xbot5.webp",
      alt: t('robots.xbot.carousel.lidarTitle'),
    },
    {
      id: 3,
      title: t('robots.xbot.carousel.rgbdTitle'),
      description: t('robots.xbot.carousel.rgbdDesc'),
      image: "/images/xbot6.webp",
      alt: t('robots.xbot.carousel.rgbdTitle'),
    },
    {
      id: 4,
      title: t('robots.xbot.carousel.touchscreenTitle'),
      description: t('robots.xbot.carousel.touchscreenDesc'),
      image: "/images/xbot4.webp",
      alt: t('robots.xbot.carousel.touchscreenTitle'),
    },
    {
      id: 5,
      title: t('robots.xbot.carousel.thresholdsTitle'),
      description: t('robots.xbot.carousel.thresholdsDesc'),
      image: "/images/xbot7.webp",  
      alt: t('robots.xbot.carousel.thresholdsTitle'),
    },
    {
      id: 6,
      title: t('robots.xbot.carousel.batteryTitle'),
      description: t('robots.xbot.carousel.batteryDesc'),
      image: "/images/xbot3.webp",
      alt: t('robots.xbot.carousel.batteryTitle'),
    },
  ];

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20">
      <Navbar onNavigate={handleNavigation} />
      
      {/* Hero Section with Video Background - No Text */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src="/images/XBOT.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
          {/* Music Control Button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 z-50 bg-black/70 hover:bg-black/90 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm border-2 border-white/20 shadow-lg"
            aria-label={isMuted ? t("common.unmuteVideo") : t("common.muteVideo")}
          >
            {isMuted ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-gray-900/40" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Column - Robot Image Card */}
            <div className="flex justify-center order-2 lg:order-1">
              <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-primary to-surface rounded-2xl shadow-2xl border-4 border-primary overflow-hidden relative">
                <Image
                  src="/images/xbot1.avif"
                  alt={t("robots.nameXbot")}
                  fill
                  className="object-cover"
                  priority
                  quality={85}
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                />
              </div>
            </div>

            {/* Right Column - Text Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary-foreground rounded-full animate-pulse"></span>
                {t("robots.nameXbot")}
              </div>
              <AnimatedText 
                text={t("robots.xbot.headline")}
                delay={0}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent"
                tag="h2"
              />
              <AnimatedText 
                text={t("robots.xbot.subhead")}
                delay={300}
                className="text-xl sm:text-2xl font-semibold text-secondary mb-6 sm:mb-8"
                tag="h3"
              />
              <AnimatedText 
                text={t("robots.xbot.intro")}
                delay={600}
                className="text-base sm:text-lg text-foreground/80 leading-relaxed"
                tag="p"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-16 sm:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Column - Advanced Features Text */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary-foreground rounded-full animate-pulse"></span>
                {t("robots.keyFeatures")}
              </div>
              <AnimatedText 
                text={t("robots.advancedFeatures")}
                delay={0}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent"
                tag="h2"
              />
              <AnimatedText 
                text={t("robots.realImpact")}
                delay={300}
                className="text-xl sm:text-2xl font-semibold text-secondary mb-6 sm:mb-8"
                tag="h3"
              />
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{t('robots.xbot.bullets.screenTitle')}</h4>
                    <p className="text-secondary text-xs sm:text-sm">{t('robots.xbot.bullets.screenDesc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{t('robots.xbot.bullets.batteryTitle')}</h4>
                    <p className="text-secondary text-xs sm:text-sm">{t('robots.xbot.bullets.batteryDesc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{t('robots.xbot.bullets.navTitle')}</h4>
                    <p className="text-secondary text-xs sm:text-sm">{t('robots.xbot.bullets.navDesc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{t('robots.xbot.bullets.modularTitle')}</h4>
                    <p className="text-secondary text-xs sm:text-sm">{t('robots.xbot.bullets.modularDesc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{t('robots.xbot.bullets.modelsTitle')}</h4>
                    <p className="text-secondary text-xs sm:text-sm">{t('robots.xbot.bullets.modelsDesc')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Robot Image Card */}
            <div className="flex justify-center order-1 lg:order-2">
              <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-primary to-surface rounded-2xl shadow-2xl border-4 border-primary overflow-hidden relative">
                <Image
                  src="/images/xbot8.webp"
                  alt={t("robots.nameXbot")}
                  fill
                  className="object-cover"
                  priority
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Built to Automate - Smaller section below features */}
      
      {/* Feature Cards Carousel */}
      <section className="py-16 sm:py-20 bg-surface relative">
        {/* Header Content - Centered */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary-foreground rounded-full animate-pulse"></span>
            {t("robots.featuresBadge")}
          </div>
          <AnimatedText 
            text={t("robots.builtToAutomate")}
            delay={0}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent"
            tag="h2"
          />
          <AnimatedText 
            text={t("robots.designedToPerform")}
            delay={300}
            className="text-xl sm:text-2xl font-semibold text-secondary mb-6 sm:mb-8"
            tag="h3"
          />
          <AnimatedText 
            text={t("industries.subtitle2")}
            delay={600}
            className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed px-4"
            tag="p"
          />
        </div>
        
        {/* Infinite Rolling Cards - TRUE Full Width */}
        <div className="relative overflow-hidden w-full">
          {/* Main Carousel Container */}
          <div className="flex animate-scroll w-max">
              {/* First Set of Cards */}
              {features.map((feature, index) => (
                <div key={feature.id} className="flex-shrink-0 mx-2 sm:mx-3">
                  <div className="group relative w-72 h-80 sm:w-80 sm:h-96 bg-surface rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl border border-border">
                    {/* Image Container */}
                    <div className="w-full h-full relative overflow-hidden">
                      <Image 
                        src={feature.image} 
                        alt={feature.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3}
                        quality={85}
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        {/* Content Container */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                          {/* Feature Tag */}
                          <div className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-full text-xs font-medium mb-3 sm:mb-4">
                            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-foreground rounded-full"></span>
                            {t('robots.featuresBadge')} {index + 1}
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                            {feature.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-white/90 text-xs sm:text-sm leading-relaxed max-w-xs">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Subtle Border Glow on Hover */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-all duration-500"></div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Second Set for Seamless Loop */}
              {features.map((feature, index) => (
                <div key={`duplicate-${feature.id}`} className="flex-shrink-0 mx-2 sm:mx-3">
                  <div className="group relative w-72 h-80 sm:w-80 sm:h-96 bg-surface rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl border border-border">
                    <div className="w-full h-full relative overflow-hidden">
                      <Image 
                        src={feature.image} 
                        alt={feature.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={false}
                        quality={85}
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                          <div className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-full text-xs font-medium mb-3 sm:mb-4">
                            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-foreground rounded-full"></span>
                            {t('robots.featuresBadge')} {index + 1}
                          </div>
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                            {feature.title}
                          </h3>
                          <p className="text-white/90 text-xs sm:text-sm leading-relaxed max-w-xs">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-all duration-500"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Real-World Impact Header Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-background via-surface to-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Enhanced Service Cases Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary-foreground rounded-full animate-pulse"></span>
              {t("robots.serviceCases")}
            </div>
            
            {/* Main Title with Enhanced Typography */}
            <AnimatedText 
              text={t("robots.realWorldImpact")}
              delay={0}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 sm:mb-8 leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent"
              tag="h2"
            />
            
            {/* Subtitle with Professional Styling */}
            <AnimatedText 
              text={t("robots.trustedByLeaders")}
              delay={400}
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-secondary mb-8 sm:mb-10 leading-relaxed max-w-4xl mx-auto px-4"
              tag="h3"
            />
            
            {/* Enhanced Description */}
            <div className="relative">
              <AnimatedText 
                text={t("robots.xbot.impactDesc")}
                delay={800}
                className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-5xl mx-auto leading-relaxed relative z-10 px-4"
                tag="p"
              />
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-6 h-6 sm:w-8 sm:h-8 bg-primary/20 rounded-full blur-sm"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 sm:w-12 sm:h-12 bg-primary/10 rounded-full blur-md"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer Section */}
      <Footer />
    </div>
  );
}