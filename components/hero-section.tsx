
"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative h-[300px] md:h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero.png')"
        }}
      />
      
      {/* Dark Overlay with warm tint */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-primary-green/20" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-playfair text-white">
            Real Help for Real People
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-inter">
            Find Trusted McKenzie Friends for Family Law Support
          </p>
          
          {/* CTA Button */}
          <div className="pt-4">
            <Button
              size="lg"
              className="bg-primary-green hover:bg-primary-green/90 text-white px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-inter"
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
