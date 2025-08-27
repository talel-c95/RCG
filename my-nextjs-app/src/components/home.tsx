"use client"

import Image from "next/image"
import heroImg from "@/images/human-robot-handshake-collaboration-digital-age.jpg"
import WhyChooseUs from "./WhyChooseUs"

const HomeHero = () => {
  return (
    <>
      {/* Original Hero Section */}
      <section id="home" className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImg}
            alt="Human and robot handshake"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-2xl text-left text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
              RKHAMI Consulting Group
            </h1>
            <p className="mt-6 text-3xl sm:text-4xl md:text-5xl font-medium">
              Strategy.
            </p>
            <p className="mt-8 text-base sm:text-lg md:text-xl text-white/90">
              We partner with you to boost efficiency and innovation through
              tailored automation and strategic guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />
    </>
  )
}

export default HomeHero
