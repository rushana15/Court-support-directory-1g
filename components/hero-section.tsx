
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative">
      {/* Hero Banner */}
      <div className="relative h-[600px] overflow-hidden bg-gray-100">
        <Image
          src="/hero-banner.png"
          alt="Professional consultation"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-playfair leading-tight">
              Expert McKenzie Friend Support
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-inter leading-relaxed max-w-3xl mx-auto">
              Vetted professionals for family court support, no solicitor needed
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                className="bg-cta-coral hover:bg-cta-coral-hover text-white border-none rounded-full px-6 py-3 font-bold font-inter transition-all duration-300 hover:shadow-lg"
              >
                <Link href="/directory">Browse the Directory</Link>
              </Button>
              <Button 
                variant="outline" 
                asChild 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-header-footer rounded-full px-6 py-3 font-bold font-inter transition-all duration-300"
              >
                <Link href="#how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
