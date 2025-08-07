
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="bg-primary-background py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-playfair leading-tight text-main-text">
              Expert McKenzie Friend Support
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 font-inter leading-relaxed text-main-text">
              Vetted professionals for family court support, no solicitor needed
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
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

          {/* Right Column - Image */}
          <div className="relative">
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
