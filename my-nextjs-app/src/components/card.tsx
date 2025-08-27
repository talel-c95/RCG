"use client"

import Image from "next/image"
import { ReactNode } from "react"

type FeatureCardProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt?: string
  icon?: ReactNode
}

const FeatureCard = ({ title, description, imageSrc, imageAlt = "", icon }: FeatureCardProps) => {
  return (
    <div
      className="group relative w-full md:w-[300px] max-w-[300px] h-[400px] rounded-[10px]
                 shadow-md hover:shadow-lg transition-all duration-300
                 hover:scale-[1.02] overflow-hidden"
      style={{ backgroundColor: "#F5F5F5", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
    >
      <div className="flex h-full md:flex-row flex-col">
        {/* Left visual */}
        <div className="md:w-[40%] w-full md:h-full h-[160px] flex items-center justify-center p-4">
          <div className="relative w-[120px] h-[120px] rounded-lg overflow-hidden border" style={{ borderColor: "#E0E0E0", borderWidth: 1 }}>
            <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 flex flex-col px-5 pt-4 pb-5">
          {/* Header */}
          <div className="flex items-center gap-2">
            {icon ? (
              <span className="text-[20px]" style={{ color: "#007BFF" }}>{icon}</span>
            ) : (
              <span className="inline-block w-4 h-4 rounded-sm" style={{ backgroundColor: "#007BFF" }} />
            )}
            <h3 className="text-[18px] font-bold" style={{ color: "#333333" }}>{title}</h3>
          </div>

          {/* Description */}
          <p className="mt-3 text-[14px] leading-relaxed line-clamp-3" style={{ color: "#666666" }}>
            {description}
          </p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* CTA */}
          <button
            className="w-[100px] h-[30px] rounded-md text-white text-sm font-medium transition-colors"
            style={{ backgroundColor: "#007BFF" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
            aria-label="Learn more"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeatureCard
