"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image" // Import Image component

export default function HeroSection() {
  return (
    <section className="relative h-[300px] md:h-[400px] flex items-center justify-center bg-beige overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0"
      >
        <Image
          src="/hero.png"
          alt="Supportive family consultation"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark Overlay with warm tint */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-slate-green/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-green font-playfair">
            Real Help for Real People
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-inter">
            Find Trusted McKenzie Friends for Family Law Support
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Button
              size="lg"
              className="bg-slate-green hover:bg-slate-green/85 text-white px-10 py-5 text-lg font-semibold font-inter rounded-full shadow-lg hover:shadow-xl hover:ring-2 hover:ring-slate-green/30 transition-all duration-300"
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