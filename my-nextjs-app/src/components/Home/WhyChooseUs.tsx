"use client"

import { useState, useEffect } from "react"

const phrases = [
  {
    title: "Holistic Approach",
    description: "We combine strategic consulting with practical robotics implementation for comprehensive solutions.",
    icon: "🔄"
  },
  {
    title: "Tailored Solutions", 
    description: "We understand that every business is unique and develop solutions to meet your specific challenges and goals.",
    icon: "⚙️"
  },
  {
    title: "Local Expertise, Global Vision",
    description: "Based in Tunisia, we possess a deep understanding of the local market while maintaining a global perspective on technological advancements.",
    icon: "🌍"
  },
  {
    title: "Experienced Team",
    description: "Our consultants and engineers have a proven track record of delivering successful automation projects.",
    icon: "👥"
  },
  {
    title: "Long-Term Partnership",
    description: "We are committed to building lasting relationships with our clients, providing ongoing support and guidance.",
    icon: "🤝"
  }
]

const WhyChooseUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-advance every 5 seconds (slower for softer experience)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % phrases.length)
          setIsTransitioning(false)
        }, 300) // Brief pause during transition
      }
    }, 2500)

    return () => clearInterval(interval)
  }, [isTransitioning])

  // Get the 3 phrases to show (current, next, previous)
  const getVisiblePhrases = () => {
    const prev = (currentIndex - 1 + phrases.length) % phrases.length
    const next = (currentIndex + 1) % phrases.length
    
    return [
      { ...phrases[prev], position: 'prev' },
      { ...phrases[currentIndex], position: 'current' },
      { ...phrases[next], position: 'next' }
    ]
  }

  const handleDotClick = (index: number) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex(index)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const visiblePhrases = getVisiblePhrases()

  return (
    <section className="relative w-full bg-gradient-to-br from-background via-background to-surface/20 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 sm:mb-6">
            Why Choose Us?
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed px-4">
            We provide tailor-made advice and robotics that allow companies to innovate, optimize operations and obtain measurable results.
          </p>
        </div>

        {/* Three Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          {visiblePhrases.map((phrase) => (
            <div
              key={`${phrase.title}-${currentIndex}`}
              className={`text-center transition-all duration-1500 ease-out ${
                phrase.position === 'current' 
                  ? 'scale-102 opacity-100 transform translate-y-0' 
                  : phrase.position === 'prev'
                  ? 'scale-98 opacity-70 transform -translate-y-2'
                  : 'scale-98 opacity-70 transform translate-y-2'
              }`}
            >
              {/* Icon */}
              <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl transition-all duration-1500 ease-out ${
                phrase.position === 'current' 
                  ? 'bg-primary text-primary-foreground shadow-xl scale-110' 
                  : 'bg-muted text-muted-foreground shadow-md scale-100'
              }`}>
                {phrase.icon}
              </div>
              
              {/* Title */}
              <h3 className={`text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 transition-all duration-1500 ease-out ${
                phrase.position === 'current' ? 'text-foreground' : 'text-foreground/70'
              }`}>
                {phrase.title}
              </h3>
              
              {/* Description */}
              <p className={`text-sm sm:text-base leading-relaxed transition-all duration-1500 ease-out px-2 ${
                phrase.position === 'current' ? 'text-foreground/80' : 'text-foreground/60'
              }`}>
                {phrase.description}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3 sm:space-x-4">
          {phrases.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-700 ease-out disabled:opacity-50 ${
                index === currentIndex 
                  ? "bg-primary scale-110 shadow-lg" 
                  : "bg-muted hover:bg-muted-foreground hover:scale-105"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
