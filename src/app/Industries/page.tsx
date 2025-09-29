"use client";

import React, { useEffect, useRef } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import RetailCard from "@/components/Cards/cards";
// Import images from src/images folder
import foodImg from "@/images/food.jpg";
import agricultureImg from "@/images/drone-spraying-fertilizer-vegetable-green-plants-agriculture-technology-farm-automation.jpg";
import logisticsImg from "@/images/teens-doing-experiments-robotics-laboratory-boy-protective-glasses-looking-robot.jpg";
import manufacturingImg from "@/images/3d-rendering-biorobots-concept.jpg";
import healthcareImg from "@/images/doctors-wearing-vr-simulation-with-hologram-medical-technology.jpg";
import retailImg from "@/images/robot-with-several-shipping-boxes.jpg";

const buildIndustriesData = (t: (k: string) => string) => ([
  {
    id: 1,
    title: t('industries.cards.foodTitle'),
    description: t('industries.cards.foodDesc'),
    image: foodImg.src
  },
  {
    id: 2,
    title: t('industries.cards.agricultureTitle'),
    description: t('industries.cards.agricultureDesc'),
    image: agricultureImg.src
  },
  {
    id: 3,
    title: t('industries.cards.logisticsTitle'),
    description: t('industries.cards.logisticsDesc'),
    image: manufacturingImg.src
  },
  {
    id: 4,
    title: t('industries.cards.manufacturingTitle'),
    description: t('industries.cards.manufacturingDesc'),
    image: logisticsImg.src
  },
  {
    id: 5,
    title: t('industries.cards.healthcareTitle'),
    description: t('industries.cards.healthcareDesc'),
    image: healthcareImg.src
  },
  {
    id: 6,
    title: t('industries.cards.retailTitle'),
    description: t('industries.cards.retailDesc'),
    image: retailImg.src
  }
]);

export default function IndustriesSection() {
  const { t } = useI18n();
  const industriesData = buildIndustriesData(t);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Slower, more relaxed scrolling speed
    let isPaused = false;
    let animationId: number;

    const autoScroll = () => {
      if (scrollContainer && !isPaused) {
        scrollPosition += scrollSpeed;
        
        // Get the width of one set of cards
        const singleSetWidth = scrollContainer.scrollWidth / 2;
        
        // When we've scrolled through one complete set, reset to the beginning
        // This creates the illusion of infinite scrolling
        if (scrollPosition >= singleSetWidth) {
          scrollPosition = 0;
        }
        
        // Use smooth scrolling
        scrollContainer.scrollTo({
          left: scrollPosition,
          behavior: 'auto' // Use 'auto' for better performance
        });
      }
      
      animationId = requestAnimationFrame(autoScroll);
    };

    // Start the animation
    animationId = requestAnimationFrame(autoScroll);

    // Pause on hover
    const handleMouseEnter = () => {
      isPaused = true;
    };
    
    const handleMouseLeave = () => {
      isPaused = false;
    };

    // Pause on touch for mobile
    const handleTouchStart = () => {
      isPaused = true;
    };
    
    const handleTouchEnd = () => {
      setTimeout(() => {
        isPaused = false;
      }, 1500); // Resume after 1.5 seconds
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20">
      {/* Industries Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto"></div>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4 uppercase tracking-wider">
            {t('industries.topLabel')}
          </h3>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            {t('industries.title')}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-4 sm:mb-6">
            {t('industries.subtitle1')}
          </p>
          <p className="text-base sm:text-lg text-muted-foreground/80 max-w-4xl mx-auto leading-relaxed px-4">
            {t('industries.subtitle2')}
          </p>
        </div>
      </div>

      {/* Automated Scrolling Cards Container - Full Width */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto px-4 sm:px-6"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          scrollBehavior: 'auto',
          willChange: 'scroll-position'
        }}
      >
        {/* First set of cards */}
        {industriesData.map((industry) => (
          <div key={industry.id} className="flex-shrink-0 w-80 sm:w-96">
            <RetailCard
              title={industry.title}
              description={industry.description}
              image={industry.image}
              className="w-full h-80 border-0"
            />
          </div>
        ))}
        
        {/* Duplicate cards for seamless loop */}
        {industriesData.map((industry) => (
          <div key={`duplicate-${industry.id}`} className="flex-shrink-0 w-80 sm:w-96">
            <RetailCard
              title={industry.title}
              description={industry.description}
              image={industry.image}
              className="w-full h-80 border-0"
            />
          </div>
        ))}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-x-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
