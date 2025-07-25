
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
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 max-w-3xl mx-auto">
        <div className="space-y-8">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-merriweather">
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
              className="bg-[#004A7F] hover:bg-[#003A6B] text-white px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-inter"
              asChild
            >
              <Link href="/directory">Browse the Directory</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
