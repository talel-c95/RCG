"use client";

import React, { useEffect, useRef } from 'react';
import RetailCard from "@/components/Cards/cards";
// Import images from src/images folder
import foodImg from "@/images/food.jpg";
import agricultureImg from "@/images/drone-spraying-fertilizer-vegetable-green-plants-agriculture-technology-farm-automation.jpg";
import logisticsImg from "@/images/teens-doing-experiments-robotics-laboratory-boy-protective-glasses-looking-robot.jpg";
import manufacturingImg from "@/images/3d-rendering-biorobots-concept.jpg";
import healthcareImg from "@/images/doctors-wearing-vr-simulation-with-hologram-medical-technology.jpg";
import retailImg from "@/images/robot-with-several-shipping-boxes.jpg";

// Array of 7 industry objects - customize these with your images, titles, and descriptions
const industriesData = [
  {
    id: 1,
    title: "Food & Beverage",
    description: "We optimize food production and packaging lines with robotics that meet hygiene standards, ensuring consistency, safety, and speed.",
    image: foodImg.src
  },
  {
    id: 2,
    title: "Agriculture",
    description: "We implement robotic systems for planting, harvesting, and monitoring crops, increasing efficiency while reducing labor-intensive operations.",
    image: agricultureImg.src
  },
  {
    id: 3,
    title: "Logistics & Warehousing",
    description: "Our automation solutions improve inventory tracking, material handling, and order fulfillment through smart robotics like AMRs and automated picking systems.",
    image: logisticsImg.src
  },
  {
    id: 4,
    title: "Manufacturing",
    description: "We streamline production lines with robotic systems, improving precision, reducing downtime, and increasing throughput for factories and industrial plants.",
    image: manufacturingImg.src
  },
  {
    id: 5,
    title: "Healthcare",
    description: "We assist hospitals and clinics in integrating service robots to enhance patient care, automate administrative tasks, and support sterile logistics.",
    image: healthcareImg.src
  },
  {
    id: 6,
    title: "Retail",
    description: "We help retail businesses adopt automation for inventory management, self-checkout systems, and customer interaction tools, enhancing the shopping experience.",
    image: retailImg.src
  }
];

export default function IndustriesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 5; // Increased from 0.5 for faster scrolling
    const scrollInterval = 50; // Faster updates for smoother movement
    let isPaused = false;

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
        
        scrollContainer.scrollLeft = scrollPosition;
      }
    };

    const intervalId = setInterval(autoScroll, scrollInterval);

    // Pause on hover
    const handleMouseEnter = () => {
      isPaused = true;
    };
    
    const handleMouseLeave = () => {
      isPaused = false;
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(intervalId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
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
            Industries We Serve
          </h3>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Engine automation
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-4 sm:mb-6">
            Through the key sectors
          </p>
          <p className="text-base sm:text-lg text-muted-foreground/80 max-w-4xl mx-auto leading-relaxed px-4">
            We associate ourselves with companies in critical industries to implement tailor-made automation solutions that transform operations, stimulate productivity and feed sustainable growth.
          </p>
        </div>
      </div>

      {/* Automated Scrolling Cards Container - Full Width */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-6 overflow-x-hidden scroll-smooth px-4 sm:px-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* First set of cards */}
        {industriesData.map((industry) => (
          <div key={industry.id} className="flex-shrink-0">
            <RetailCard
              title={industry.title}
              description={industry.description}
              image={industry.image}
              className="w-100 h-120 border-0"
            />
          </div>
        ))}
        
        {/* Duplicate cards for seamless loop */}
        {industriesData.map((industry) => (
          <div key={`duplicate-${industry.id}`} className="flex-shrink-0">
            <RetailCard
              title={industry.title}
              description={industry.description}
              image={industry.image}
              className="w-100 h-120 border-0"
            />
          </div>
        ))}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .overflow-x-hidden::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
