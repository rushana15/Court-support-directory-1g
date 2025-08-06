
"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative h-[400px] md:h-[500px] flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero.png')"
        }}
      />
      
      {/* Dark Overlay with beige tint */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(245, 241, 231, 0.15)" }} />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 max-w-3xl mx-auto">
        <div className="space-y-8">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-merriweather" style={{ color: "#1e3c34" }}>
            Find Verified McKenzie Friends
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-inter">
            Compassionate and experienced support for your family court journey.
          </p>
          
          {/* CTA Button */}
          <div className="pt-4">
            <Button
              size="lg"
              className="text-white px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-inter"
              style={{ backgroundColor: "#1e3c34" }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#2f534a"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#1e3c34"}
              asChild
            >
              <Link href="/directory">Browse the Directory</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
