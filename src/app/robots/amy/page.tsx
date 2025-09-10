"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

import Image from "next/image";

// Custom hook for line-by-line animation
const useAnimatedText = () => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [, setCurrentLineIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = useCallback((totalLines: number, delay: number = 100) => {
    setVisibleLines([]);
    setCurrentLineIndex(0);
    
    intervalRef.current = setInterval(() => {
      setCurrentLineIndex(prev => {
        if (prev < totalLines) {
          setVisibleLines(current => [...current, prev]);
          return prev + 1;
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return prev;
        }
      });
    }, delay);
  }, []);

  const stopAnimation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { visibleLines, startAnimation, stopAnimation };
};

// AnimatedText component
const AnimatedText = ({ 
  text, 
  delay = 0, 
  className = "", 
  tag: Tag = "p"
}: { 
  text: string; 
  delay?: number; 
  className?: string; 
  tag?: string;
}) => {
  const { visibleLines, startAnimation } = useAnimatedText();
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setTimeout(() => {
            const lines = text.split('\n').length;
            startAnimation(lines, 150);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [text, delay, startAnimation, isVisible]);

  const lines = text.split('\n');
  
  const TagComponent = Tag as any;
  
  return (
    <TagComponent ref={elementRef} className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ${
            visibleLines.includes(index)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
    </TagComponent>
  );
};

export default function RobotAmyPage() {
  const [, setCurrentSlide] = useState(0);
  const features = [
    {
      id: 1,
      title: "Welcome and Attract Guests",
      description:
        "The humanoid Amy robot supports facial recognition sensing and plays welcome and promotional messages.",
      image: "/images/amy7.png",
      alt: "Welcome and Attract Guests",
    },
    {
      id: 2,
      title: "Intelligent Voice Interaction",
      description:
        "Built in self-developed vertical large model 'Smartstar' AI voice interaction, natural semantic understanding, personification and efficient communication.",
      image: "/images/amy6.jpg",
      alt: "Intelligent Voice Interaction",
    },
    {
      id: 3,
      title: "Double Layer Tray",
      description:
        "The double-layer tray can carry about 5 kilograms, and the tray size meets various usage ranges in the catering industry.",
      image: "/images/amy2.webp",
      alt: "Double Layer Tray",
    },
    {
      id: 4,
      title: "Introduction to Dishes",
      description:
        "Voice recommendation of featured dishes, food introduction, today's specials, set meals, etc., to provide customers with more dish references.",
      image: "/images/amy9.avif",
      alt: "Introduction to Dishes",
    },
    {
      id: 5,
      title: "Efficient Food Delivery",
      description:
        "High-precision navigation indoors, stable and free movement; shock absorption system effectively enhances driving stability and prevents food from spilling.",
      image: "/images/amy8.jpg",  
      alt: "Efficient Food Delivery",
    },
    {
      id: 6,
      title: "Autonomous Obstacle Avoidance",
      description:
        "Combining LiDAR and depth camera, it has the ability of stereoscopic perception and obstacle avoidance, accurately identifying obstacles such as table legs and table tops. Perceive real-time personnel walking around, choose the optimal route to advance, and reach the target point.",
      image: "/images/amy4.webp",
      alt: "Autonomous Obstacle Avoidance",
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
      <Navbar />
      
      {/* Hero Section with Video Background - No Text */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-gray-900/40" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Robot Image Card */}
            <div className="flex justify-center">
              <div className="w-96 h-96 bg-gradient-to-br from-primary to-surface rounded-2xl shadow-2xl border-4 border-primary overflow-hidden relative">
                <Image
                  src="/images/amy1.webp"
                  alt="Robot Amy"
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
                Amy
              </div>
              <h2 className="text-5xl font-bold text-foreground mb-6 leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                The Future of Smart Hospitality
              </h2>
              <h3 className="text-2xl font-semibold text-secondary mb-8">
                Your Interactive Delivery Companion
              </h3>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Amy is a service delivery robot designed for restaurants, hotels, and commercial spaces. With voice interaction, obstacle avoidance, and high-precision LiDAR navigation, Amy delivers items smoothly and interacts naturally with guests.
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
                Key Features
              </div>
              <h2 className="text-5xl font-bold text-foreground mb-6 leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                Advanced Features
              </h2>
              <h3 className="text-2xl font-semibold text-secondary mb-8">
                Real Impact
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">13" HD Touch Screen</h4>
                    <p className="text-secondary">Intuitive user interface for orders and interaction</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">15Ah Battery Capacity</h4>
                    <p className="text-secondary">8+ hours of operation with 2–3h fast charging</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">0–1.5 m/s Walking Speed</h4>
                    <p className="text-secondary">Smooth and stable indoor mobility</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">±50mm Positioning Accuracy</h4>
                    <p className="text-secondary">Precise navigation in dynamic spaces</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">5kg Load Capacity</h4>
                    <p className="text-secondary">Dual tray design ideal for hospitality and service</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">40m LiDAR + Ultrasonic Sensors</h4>
                    <p className="text-secondary">Advanced obstacle avoidance</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Android OS + Voice AI (Smartstar)</h4>
                    <p className="text-secondary">Smart communication and dish guidance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Robot Image Card */}
            <div className="flex justify-center">
              <div className="w-full h-96 rounded-2xl shadow-2xl border-4 border-primary overflow-hidden relative">
                <Image
                  src="/images/amy31.jpg"
                  alt="Robot Amy"
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
            Features
          </div>
          <h2 className="text-5xl font-bold text-foreground mb-6 leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            Built to Automate
          </h2>
          <h3 className="text-2xl font-semibold text-secondary mb-8">
            Designed to Perform.
          </h3>
          <p className="text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            We empower industries with intelligent automation solutions that streamline workflows, enhance productivity, and drive sustainable growth across every sector.
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
                            Feature {index + 1}
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
              
              {/* Second Set for Seamless Loop - Optimized */}
              {features.slice(0, 3).map((feature, index) => (
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
                            Feature {index + 1}
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
              Service Cases
            </div>
            
            {/* Main Title with Enhanced Typography */}
            <h2 className="text-6xl font-bold text-foreground mb-8 leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              Real-World Impact Across Industries
            </h2>
            
            {/* Subtitle with Professional Styling */}
            <h3 className="text-3xl font-semibold text-secondary mb-10 leading-relaxed max-w-4xl mx-auto">
              Trusted by Leaders in Logistics and Manufacturing
            </h3>
            
            {/* Enhanced Description */}
            <div className="relative">
              <p className="text-xl text-foreground/80 max-w-5xl mx-auto leading-relaxed relative z-10">
                From smart warehouses to automated production lines, Amy delivers real results. Our robots are deployed in diverse industrial settings, improving efficiency, accuracy, and safety with every task.
              </p>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full blur-sm"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary/10 rounded-full blur-md"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer Section */}
      <Footer />
    </div>
  );
}
