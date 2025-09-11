"use client";

import React, { useState, useRef } from "react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import Image from "next/image";
import { useNavigation } from "@/hooks/useNavigation";
import { useTheme } from "@/contexts/ThemeContext";

export default function EmenuPage() {
  const [isMuted, setIsMuted] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { handleNavigation } = useNavigation();
  const { theme } = useTheme();

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % howItWorks.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + howItWorks.length) % howItWorks.length);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const featureCards = [
    {
      id: 1,
      title: "QR Code Access",
      description:
        "Guests scan a table QR to instantly open your live menu—no app required.",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm6-2h2v4h4V3h2v6h-8V3zm8 8h2v2h-2v-2zm-2 0v2h-2v-2h2zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm10 0h2v2h-2v-2zm0 4h2v2h-2v-2zm4-4h2v6h-6v-2h4v-4z"/></svg>
      ),
    },
    {
      id: 2,
      title: "Contactless Ordering",
      description:
        "Browse items, add to cart, and place orders right from the phone.",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0a2 2 0 100 4 2 2 0 000-4zM7.16 14h9.69c.75 0 1.41-.41 1.76-1.05l3.24-5.88A1 1 0 0019 6H6.21l-.94-2H2v2h2l3.6 7.59-.95 1.72A2 2 0 007 18h12v-2H7.42l.74-1.33z"/></svg>
      ),
    },
    {
      id: 3,
      title: "Real-Time Updates",
      description:
        "Edit prices and availability in seconds—changes go live instantly.",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6V3L8 7l4 4V8c2.76 0 5 2.24 5 5a5 5 0 11-5-5zm-7 5a7 7 0 1014 0 7 7 0 00-14 0z"/></svg>
      ),
    },
  ];

  const howItWorks = [
    { 
      id: 1, 
      title: "Scan QR", 
      desc: "Guests scan the table QR code with their phone camera.",
      icon: "📱"
    },
    { 
      id: 2, 
      title: "Open Menu", 
      desc: "A fast, responsive menu opens instantly.",
      icon: "⚡"
    },
    { 
      id: 3, 
      title: "Browse & Customize Items", 
      desc: "Guests can view menu categories, select items, and customize options (ingredients, size, quantity).",
      icon: "🍽️"
    },
    { 
      id: 4, 
      title: "Place Order", 
      desc: "Add items and submit orders contactlessly.",
      icon: "🛒"
    },
    { 
      id: 5, 
      title: "Restaurant Dashboard", 
      desc: "Staff receives orders in real-time, updates menu items, marks orders as ready, and manages inventory.",
      icon: "📊"
    },
    { 
      id: 6, 
      title: "Assistance & Notifications", 
      desc: "Guests can call the waiter or request help. Staff receives notifications for requests.",
      icon: "🔔"
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        .step-card {
          transform-style: preserve-3d;
        }
        .step-number-3d {
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #10b981 100%);
        }
        .icon-3d {
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
          text-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
        }
        .nav-button-prev {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.8);
          transform: perspective(1000px) rotateX(5deg);
        }
        .nav-button-next {
          box-shadow: 0 15px 35px rgba(99, 102, 241, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
          transform: perspective(1000px) rotateX(5deg);
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #10b981 100%);
        }
        .indicator-active {
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transform: perspective(1000px) rotateX(15deg);
        }
        .indicator-inactive {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transform: perspective(1000px) rotateX(5deg);
        }
      `}</style>
      <Navbar onNavigate={handleNavigation} />

      {/* Hero Video First */}
      <div className="relative h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/images/emenu.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-50 bg-black/70 hover:bg-black/90 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
      </div>


      {/* Intro */}
      <section className="py-20 sm:py-28 bg-background">
        {/* Background decorative elements - only in dark mode */}
        <div className="hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-900/30 to-emerald-900/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-emerald-100/40 to-indigo-100/40 dark:from-emerald-900/30 dark:to-indigo-900/30 rounded-full blur-3xl"></div>
              </div>
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-gradient-to-r dark:from-indigo-900/50 dark:to-emerald-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-6 shadow-sm">
              <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse"></div>
              Digital Menu Solution
            </div>

            {/* Main title with gradient */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              <span className="text-foreground dark:bg-gradient-to-r dark:from-foreground dark:via-indigo-400 dark:to-emerald-400 dark:bg-clip-text dark:text-transparent">
                E-menu
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-secondary leading-relaxed mb-8 max-w-3xl mx-auto">
              Guests scan a QR code at the table to view your live menu and order—fast, contactless, and beautiful on every device.
            </p>
            
            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                No App Required
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                Instant Access
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                Real-time Updates
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why E-Menu (modern, world-class) */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: title + features */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse"></div>
                Premium Experience
          </div>
              <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                Why E-menu
          </h2>
              <p className="mt-3 text-lg text-secondary max-w-prose">
                Designed for global brands and modern hospitality—fast, elegant, and effortless for every guest.
              </p>

              <div className="mt-8 space-y-5">
                {featureCards.map((f) => (
                  <div
                    key={f.id}
                    className="group rounded-2xl bg-surface/90 backdrop-blur border border-border p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-start gap-4"
                  >
                    <div className="relative w-12 h-12 flex-shrink-0 grid place-items-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-emerald-500/15 dark:from-indigo-400/20 dark:to-emerald-400/20 text-indigo-600 dark:text-indigo-400 group-hover:from-indigo-500/25 group-hover:to-emerald-500/25 transition-colors">
                      <div className="w-10 h-10 grid place-items-center rounded-lg bg-surface shadow-sm text-indigo-600 dark:text-indigo-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {f.icon}
        </div>
                      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 blur opacity-0 group-hover:opacity-100 transition" />
                        </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {f.title}
                        </h3>
                      <p className="mt-1.5 text-secondary">{f.description}</p>
                    </div>
                  </div>
                ))}
                      </div>
                    </div>

            {/* Right: just the picture */}
            <div className="flex justify-center lg:justify-end">
              <Image src="/images/qr.png" alt="E-Menu visual" width={500} height={400} className="object-cover" priority />
                  </div>
                </div>
              </div>
      </section>

      {/* How it works - Modern Carousel */}
      <section className="py-16 sm:py-24 bg-background">
        {/* Background decorative elements - only in dark mode */}
        <div className="hidden">
          <div className="absolute top-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-indigo-900/30 to-emerald-900/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 -left-32 w-48 h-48 bg-gradient-to-tr from-emerald-100/30 to-indigo-100/30 dark:from-emerald-900/30 dark:to-indigo-900/30 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">How it works</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">From scan to order and management in six steps.</p>
          </div>

          {/* 3D Carousel Container */}
          <div className="relative perspective-1000">
            {/* 3D Card Stack */}
            <div className="relative h-[500px] flex items-center justify-center">
              {/* Background Cards (Previous/Next) */}
              {howItWorks.map((step, index) => {
                const isCurrent = index === currentStep;
                const isPrev = index === (currentStep - 1 + howItWorks.length) % howItWorks.length;
                const isNext = index === (currentStep + 1) % howItWorks.length;
                const isVisible = isCurrent || isPrev || isNext;
                
                if (!isVisible) return null;
                
                let transform = '';
                let opacity = 1;
                let zIndex = 10;
                
                if (isCurrent) {
                  transform = 'translateZ(0px) scale(1)';
                  zIndex = 20;
                } else if (isPrev) {
                  transform = 'translateZ(-100px) translateX(-200px) scale(0.8) rotateY(15deg)';
                  opacity = 0.6;
                  zIndex = 5;
                } else if (isNext) {
                  transform = 'translateZ(-100px) translateX(200px) scale(0.8) rotateY(-15deg)';
                  opacity = 0.6;
                  zIndex = 5;
                }
                
                return (
                    <div
                      key={index}
                      className="absolute transition-all duration-700 ease-out step-card"
                      style={{
                        // eslint-disable-next-line react/forbid-dom-props
                        transform,
                        opacity,
                        zIndex,
                      }}
                    >
                    <div className="bg-surface rounded-3xl shadow-2xl border border-border p-8 sm:p-12 w-[400px] h-[450px] flex flex-col justify-center relative overflow-hidden group">
                      {/* 3D Background Elements */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-emerald-50/50 dark:from-indigo-900/20 dark:to-emerald-900/20"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/30 to-emerald-100/30 dark:from-indigo-900/30 dark:to-emerald-900/30 rounded-full blur-2xl"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-100/30 to-indigo-100/30 dark:from-emerald-900/30 dark:to-indigo-900/30 rounded-full blur-2xl"></div>
                      
                      <div className="text-center relative z-10">
                        {/* 3D Step Number */}
                        <div className="inline-flex items-center justify-center w-20 h-20 text-white text-3xl font-bold rounded-2xl mb-8 shadow-2xl transform group-hover:scale-110 transition-transform duration-300 step-number-3d">
                          {String(step.id).padStart(2, '0')}
                        </div>
                        
                        {/* 3D Icon with floating effect */}
                        <div className="text-7xl mb-8 transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 icon-3d">
                          {step.icon}
                        </div>
                        
                        {/* 3D Title with gradient text */}
                        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground dark:bg-gradient-to-r dark:from-foreground dark:via-indigo-400 dark:to-emerald-400 dark:bg-clip-text dark:text-transparent transform group-hover:scale-105 transition-transform duration-300">
                          {step.title}
                        </h3>
                        
                        {/* 3D Description with enhanced typography */}
                        <p className="text-lg text-secondary leading-relaxed max-w-sm mx-auto transform group-hover:translate-y-1 transition-transform duration-300">
                          {step.desc}
                        </p>
                      </div>
                      
                      {/* 3D Border Effect */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-transparent to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                );
              })}
            </div>

            {/* 3D Navigation Controls */}
            <div className="flex items-center justify-center gap-6 mt-12">
              <button
                onClick={prevStep}
                className="group p-4 rounded-2xl bg-surface shadow-2xl border border-border hover:bg-gradient-to-br hover:from-muted hover:to-indigo-50 dark:hover:to-indigo-900/20 transition-all duration-300 hover:scale-110 hover:-translate-y-1 nav-button-prev"
                aria-label="Previous step"
              >
                <svg className="w-7 h-7 text-secondary group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 dark:from-indigo-400/20 dark:to-emerald-400/20 rounded-2xl border border-indigo-200/50 dark:border-indigo-700/50 backdrop-blur-sm">
                <span className="text-sm font-semibold text-foreground">
                  {currentStep + 1} of {howItWorks.length}
                </span>
              </div>
              
              <button
                onClick={nextStep}
                className="group p-4 rounded-2xl text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 nav-button-next"
                aria-label="Next step"
              >
                <svg className="w-7 h-7 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              </div>

            {/* 3D Step Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {howItWorks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`relative transition-all duration-500 hover:scale-125 ${
                    index === currentStep
                      ? 'w-12 h-3'
                      : 'w-3 h-3'
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                >
                  <div
                    className={`w-full h-full rounded-full transition-all duration-500 ${
                      index === currentStep
                        ? 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 shadow-lg indicator-active'
                        : 'bg-muted hover:bg-gradient-to-r hover:from-indigo-400 hover:to-emerald-400 indicator-inactive'
                    }`}
                  />
                  {index === currentStep && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Global by design */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">Global by design</h3>
              <p className="text-secondary">Built for international restaurants and diverse customer bases</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-surface rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
                <div className="text-2xl mb-3">🌍</div>
                <div className="text-sm font-semibold text-foreground mb-2">Multilingual</div>
                <p className="text-sm text-secondary">Serve menus in multiple languages with easy switching.</p>
              </div>
              <div className="bg-surface rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
                <div className="text-2xl mb-3">↔️</div>
                <div className="text-sm font-semibold text-foreground mb-2">RTL Support</div>
                <p className="text-sm text-secondary">Right‑to‑left layouts for Arabic, Hebrew, and more.</p>
              </div>
              <div className="bg-surface rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
                <div className="text-2xl mb-3">💰</div>
                <div className="text-sm font-semibold text-foreground mb-2">Localization</div>
                <p className="text-sm text-secondary">Localized currencies, formats, and regional preferences.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">Ready to modernize your dining?</h3>
              <p className="mt-2 text-secondary">Launch a beautiful, contactless menu in minutes.</p>
            </div>
            <a href="/Contact" className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition shadow-sm">
              Contact us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


