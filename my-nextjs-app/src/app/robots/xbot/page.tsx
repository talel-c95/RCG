"use client";

import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { useI18n } from "@/contexts/I18nContext";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

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

// Component for animated text block with line-by-line animation
function AnimatedTextBlock({ 
  lines, 
  delay = 0, 
  className = "",
  lineClassName = ""
}: {
  lines: string[];
  delay?: number;
  className?: string;
  lineClassName?: string;
}) {
  const { ref, animatedLines } = useLineAnimation(delay);

  return (
    <div ref={ref} className={className}>
      {lines.map((line, index) => (
        <div
          key={index}
          data-line={index}
          className={`transform transition-all duration-700 ease-out ${
            animatedLines.includes(index)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          } ${lineClassName}`}
        >
          {line}
        </div>
      ))}
    </div>
  );
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
  const { ref, animatedLines } = useLineAnimation(delay);
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
  }, [isVisible]);

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
  const { t } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);
  const features = [
    {
      id: 1,
      title: "500KG Max Load Capacity",
      description:
        "The body is made from 80% high-strength aluminum alloy, ensuring excellent stability. Designed for repetitive and cyclical transportation of heavy goods, with broad application scenarios to enhance efficiency and reliability in material flow.",
      image: "/images/xbot2.webp",
      alt: "500KG Load Capacity",
    },
    {
      id: 2,
      title: "40m LiDAR",
      description:
        "Equipped with advanced LiDAR technology for real-time navigation and safety. Suitable for factories covering tens of thousands of square meters and adaptable to various operational environments.",
      image: "/images/xbot5.webp",
      alt: "40m LiDAR Technology",
    },
    {
      id: 3,
      title: "RGBD High-Definition Camera",
      description:
        "Binocular cameras + LiDAR, three-dimensional intelligent obstacle avoidance, real-time perception of the dynamic environment.",
      image: "/images/xbot6.webp",
      alt: "RGBD High-Definition Camera",
    },
    {
      id: 4,
      title: "13.3-Inch Touchscreen",
      description:
        "The large screen displays information query, map, etc. more clearly.",
      image: "/images/xbot4.webp",
      alt: "13.3-Inch Touchscreen",
    },
    {
      id: 5,
      title: "Thresholds and Grooves Crossed Freely",
      description:
        "Equipped with 8-inch main drive wheels and 5-inch large double-row universal wheels. Delivers robust power to overcome 30mm thresholds and 40mm grooves with ease, enabling precise material transfer between production lines and meeting autonomous elevator riding requirements.",
      image: "/images/xbot7.webp",  
      alt: "Thresholds and Grooves Crossed Freely",
    },
    {
      id: 6,
      title: "High-Security Lithium-Ion Battery",
      description:
        "Battery capacity 24V40AH, high temperature resistant, non-explosive, non-combustible, providing safe and reliable use, long battery life.",
      image: "/images/xbot3.webp",
      alt: "High-Security Lithium-Ion Battery",
    },
  ];
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
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
                  alt="Robot Xbot"
                  fill
                  className="object-cover"
                  priority
                  quality={90}
                />
              </div>
            </div>

            {/* Right Column - Text Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary-foreground rounded-full animate-pulse"></span>
                Oxbot
              </div>
              <AnimatedText 
                text="Revolutionizing Industrial Delivery"
                delay={0}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent"
                tag="h2"
              />
              <AnimatedText 
                text="Your Smart Logistics Assistant"
                delay={300}
                className="text-xl sm:text-2xl font-semibold text-secondary mb-6 sm:mb-8"
                tag="h3"
              />
              <AnimatedText 
                text="Oxbot is an advanced Autonomous Mobile Robot (AMR) engineered to streamline industrial material handling. With impressive features like 500kg payload, 40m LiDAR, and RGBD obstacle avoidance, Oxbot ensures smooth, efficient, and safe transport across warehouses and factories."
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
                Key Features
              </div>
              <AnimatedText 
                text="Advanced Features"
                delay={0}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent"
                tag="h2"
              />
              <AnimatedText 
                text="Real Impact"
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
                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">13.3&quot; Full HD Touchscreen</h4>
                    <p className="text-secondary text-xs sm:text-sm">Clear, user-friendly interface for seamless operation</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">24V40AH Lithium Battery</h4>
                    <p className="text-secondary text-xs sm:text-sm">Long life, high safety, zero combustion</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Smart Navigation</h4>
                    <p className="text-secondary text-xs sm:text-sm">LiDAR + RGBD camera for 3D obstacle detection</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Modular Design</h4>
                    <p className="text-secondary text-xs sm:text-sm">Choose between Standard / Bin / Shelf modes</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Multiple Models</h4>
                    <p className="text-secondary text-xs sm:text-sm">F150 (150kg), F300 (300kg), F500 (500kg)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Robot Image Card */}
            <div className="flex justify-center order-1 lg:order-2">
              <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-primary to-surface rounded-2xl shadow-2xl border-4 border-primary overflow-hidden relative">
                <Image
                  src="/images/xbot1.avif"
                  alt="Robot Xbot"
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
            Features
          </div>
          <AnimatedText 
            text="Built to Automate"
            delay={0}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent"
            tag="h2"
          />
          <AnimatedText 
            text="Designed to Perform."
            delay={300}
            className="text-xl sm:text-2xl font-semibold text-secondary mb-6 sm:mb-8"
            tag="h3"
          />
          <AnimatedText 
            text="We empower industries with intelligent automation solutions that streamline workflows, enhance productivity, and drive sustainable growth across every sector."
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
                            Feature {index + 1}
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
                            Feature {index + 1}
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
              Service Cases
            </div>
            
            {/* Main Title with Enhanced Typography */}
            <AnimatedText 
              text="Real-World Impact Across Industries"
              delay={0}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 sm:mb-8 leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent"
              tag="h2"
            />
            
            {/* Subtitle with Professional Styling */}
            <AnimatedText 
              text="Trusted by Leaders in Logistics and Manufacturing"
              delay={400}
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-secondary mb-8 sm:mb-10 leading-relaxed max-w-4xl mx-auto px-4"
              tag="h3"
            />
            
            {/* Enhanced Description */}
            <div className="relative">
              <AnimatedText 
                text="From smart warehouses to automated production lines, Oxbot delivers real results. Our robots are deployed in diverse industrial settings, improving efficiency, accuracy, and safety with every task."
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