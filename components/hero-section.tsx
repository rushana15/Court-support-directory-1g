
"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="bg-primary-background py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Main Heading - Full Width at Top */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-playfair text-main-text transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            UK's First Fully Vetted Divorce Support Directory
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-left flex flex-col justify-center py-8 lg:py-12 px-6 lg:px-8 min-h-[500px] lg:min-h-[600px]">
            <div className="max-w-none">
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-playfair leading-tight text-main-text transition-all duration-1000 ease-out delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Divorce Support You Can Trust — Experts for Court, Conflict & Co-Parenting
              </h2>
              <p className={`text-lg md:text-xl mb-8 font-inter leading-relaxed text-main-text transition-all duration-1000 ease-out delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Every professional listed here has been personally interviewed and reference-checked, with proven experience helping people through divorce and co-parenting challenges.
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <Button 
                  asChild 
                  className="bg-cta-coral hover:bg-cta-coral-hover text-white border-none rounded-full px-8 py-4 font-bold font-inter transition-all duration-300 hover:shadow-lg text-lg"
                >
                  <Link href="/directory">Browse the Directory</Link>
                </Button>
                <Button 
                  variant="outline" 
                  asChild 
                  className="bg-transparent border-2 border-main-text text-main-text hover:bg-main-text hover:text-white rounded-full px-8 py-4 font-bold font-inter transition-all duration-300 text-lg"
                >
                  <Link href="#how-it-works">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative px-6 lg:px-8">
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/hero-banner.png"
                alt="Professional consultation"
                fill
                className="object-cover object-center"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
