"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import Image from "next/image";
import { useNavigation } from "@/hooks/useNavigation";
import { useI18n } from "@/contexts/I18nContext";



export default function RobotAmyPage() {
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
      title: t('robots.amy.carousel.welcomeTitle'),
      description: t('robots.amy.carousel.welcomeDesc'),
      image: "/images/amy7.png",
      alt: t('robots.amy.carousel.welcomeTitle'),
    },
    {
      id: 2,
      title: t('robots.amy.carousel.voiceTitle'),
      description: t('robots.amy.carousel.voiceDesc'),
      image: "/images/amy6.jpg",
      alt: t('robots.amy.carousel.voiceTitle'),
    },
    {
      id: 3,
      title: t('robots.amy.carousel.trayTitle'),
      description: t('robots.amy.carousel.trayDesc'),
      image: "/images/amy2.webp",
      alt: t('robots.amy.carousel.trayTitle'),
    },
    {
      id: 4,
      title: t('robots.amy.carousel.dishesTitle'),
      description: t('robots.amy.carousel.dishesDesc'),
      image: "/images/amy9.avif",
      alt: t('robots.amy.carousel.dishesTitle'),
    },
    {
      id: 5,
      title: t('robots.amy.carousel.deliveryTitle'),
      description: t('robots.amy.carousel.deliveryDesc'),
      image: "/images/amy8.jpg",  
      alt: t('robots.amy.carousel.deliveryTitle'),
    },
    {
      id: 6,
      title: t('robots.amy.carousel.obstacleTitle'),
      description: t('robots.amy.carousel.obstacleDesc'),
      image: "/images/amy4.webp",
      alt: t('robots.amy.carousel.obstacleTitle'),
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
        {/* Navbar */}
        <Navbar onNavigate={handleNavigation} />
        
        {/* Hero Section with Video Background */}
        <div className="relative h-screen w-full overflow-hidden">
          <video
            ref={videoRef}
            src="/images/amy.mp4"
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
        </div>

      {/* Features Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Robot Image Card */}
            <div className="flex justify-center">
              <div className="w-96 h-96 bg-gradient-to-br from-primary to-surface rounded-2xl shadow-2xl border-4 border-primary overflow-hidden relative">
                <Image
                  src="/images/amy1.webp"
                  alt={t("robots.nameAmy")}
                  fill
                  className="object-cover"
                  priority
                  quality={90}
                />
              </div>
            </div>

            {/* Right Column - Text Content */}
            <div>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full text-sm font-semibold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="w-2.5 h-2.5 bg-primary-foreground rounded-full animate-pulse"></span>
                {t("robots.nameAmy")}
              </div>
              <h2 className="text-5xl font-bold text-foreground mb-6 leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                {t("robots.amy.headline")}
              </h2>
              <h3 className="text-2xl font-semibold text-secondary mb-8">
                {t("robots.amy.subhead")}
              </h3>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {t("robots.amy.intro")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Advanced Features Text */}
            <div>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full text-sm font-semibold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="w-2.5 h-2.5 bg-primary-foreground rounded-full animate-pulse"></span>
                {t("robots.keyFeatures")}
              </div>
              <h2 className="text-5xl font-bold text-foreground mb-6 leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                {t("robots.advancedFeatures")}
              </h2>
              <h3 className="text-2xl font-semibold text-secondary mb-8">
                {t("robots.realImpact")}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t('robots.amy.bullets.screenTitle')}</h4>
                    <p className="text-secondary">{t('robots.amy.bullets.screenDesc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t('robots.amy.bullets.batteryTitle')}</h4>
                    <p className="text-secondary">{t('robots.amy.bullets.batteryDesc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t('robots.amy.bullets.speedTitle')}</h4>
                    <p className="text-secondary">{t('robots.amy.bullets.speedDesc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t('robots.amy.bullets.accuracyTitle')}</h4>
                    <p className="text-secondary">{t('robots.amy.bullets.accuracyDesc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t('robots.amy.bullets.loadTitle')}</h4>
                    <p className="text-secondary">{t('robots.amy.bullets.loadDesc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t('robots.amy.bullets.sensorsTitle')}</h4>
                    <p className="text-secondary">{t('robots.amy.bullets.sensorsDesc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t('robots.amy.bullets.osTitle')}</h4>
                    <p className="text-secondary">{t('robots.amy.bullets.osDesc')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Robot Image Card */}
            <div className="flex justify-center">
              <div className="w-full h-96 rounded-2xl shadow-2xl border-4 border-primary overflow-hidden relative">
                <Image
                  src="/images/amy31.jpg"
                  alt={t("robots.nameAmy")}
                  fill
                  className="object-contain object-bottom"
                  priority
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Carousel */}
      <section className="py-20 bg-surface relative">
        {/* Header Content - Centered */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full text-sm font-semibold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="w-2.5 h-2.5 bg-primary-foreground rounded-full animate-pulse"></span>
            {t("robots.featuresBadge")}
          </div>
          <h2 className="text-5xl font-bold text-foreground mb-6 leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            {t("robots.builtToAutomate")}
          </h2>
          <h3 className="text-2xl font-semibold text-secondary mb-8">
            {t("robots.designedToPerform")}
          </h3>
          <p className="text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            {t("industries.subtitle2")}
          </p>
        </div>
        
        {/* Infinite Rolling Cards - Optimized */}
        <div className="relative overflow-hidden w-full">
          {/* Main Carousel Container */}
          <div className="flex animate-scroll w-max">
              {/* First Set of Cards */}
              {features.map((feature, index) => (
                <div key={feature.id} className="flex-shrink-0 mx-3">
                  <div className="group relative w-80 h-96 bg-surface rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 border border-border">
                    {/* Image Container */}
                    <div className="w-full h-full relative overflow-hidden">
                      <Image 
                        src={feature.image} 
                        alt={feature.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3}
                        quality={85}
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                        {/* Content Container */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                          {/* Feature Tag */}
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-full text-xs font-medium mb-4">
                            <span className="w-2 h-2 bg-primary-foreground rounded-full"></span>
                            {t('robots.featuresBadge')} {index + 1}
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                            {feature.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Subtle Border Glow on Hover */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-all duration-300"></div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Second Set for Seamless Loop - Full duplicate to match xbot */}
              {features.map((feature, index) => (
                <div key={`duplicate-${feature.id}`} className="flex-shrink-0 mx-3">
                  <div className="group relative w-80 h-96 bg-surface rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 border border-border">
                    <div className="w-full h-full relative overflow-hidden">
                      <Image 
                        src={feature.image} 
                        alt={feature.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={false}
                        quality={85}
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-full text-xs font-medium mb-4">
                            <span className="w-2 h-2 bg-primary-foreground rounded-full"></span>
                            {t('robots.featuresBadge')} {index + 1}
                          </div>
                          <h3 className="text-white/90 text-sm leading-relaxed max-w-xs">
                            {feature.title}
                          </h3>
                          <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-all duration-300"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Real-World Impact Header Section */}
      <section className="py-24 bg-gradient-to-br from-background via-surface to-background/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            {/* Enhanced Service Cases Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full text-sm font-semibold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="w-2.5 h-2.5 bg-primary-foreground rounded-full animate-pulse"></span>
              {t("robots.serviceCases")}
            </div>
            
            {/* Main Title with Enhanced Typography */}
            <h2 className="text-6xl font-bold text-foreground mb-8 leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              {t("robots.realWorldImpact")}
            </h2>
            
            {/* Subtitle with Professional Styling */}
            <h3 className="text-3xl font-semibold text-secondary mb-10 leading-relaxed max-w-4xl mx-auto">
              {t("robots.trustedByLeaders")}
            </h3>
            
            {/* Enhanced Description */}
            <div className="relative">
              <p className="text-xl text-foreground/80 max-w-5xl mx-auto leading-relaxed relative z-10">
                {t("robots.amy.impactDesc")}
              </p>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full blur-sm"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary/10 rounded-full blur-md"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Spacing between content and footer */}
      <div className="mt-12 sm:mt-16 lg:mt-20 mb-6 sm:mb-10"></div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
