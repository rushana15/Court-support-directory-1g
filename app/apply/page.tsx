
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-primary-background">
      {/* Advisor Recruitment Banner */}
      <div className="bg-[#E76F51] text-white text-sm md:text-base font-medium py-2 px-4 text-center hover:opacity-90 transition">
        <span>Are you a McKenzie Friend or divorce support professional? Join our growing vetted network — </span>
        <Link href="/apply" className="underline hover:no-underline">
          apply today
        </Link>
      </div>
      
      {/* Header */}
      <header className="bg-header-footer border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-3xl font-bold text-white font-playfair tracking-wide">Divorce Compass</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/#about"
                className="text-white hover:text-gray-300 hover:font-semibold transition-all font-medium font-inter"
              >
                About
              </Link>
              <Link
                href="/#how-it-works"
                className="text-white hover:text-gray-300 hover:font-semibold transition-all font-medium font-inter"
              >
                How it Works
              </Link>
              <Link
                href="/#contact"
                className="text-white hover:text-gray-300 hover:font-semibold transition-all font-medium font-inter"
              >
                Contact
              </Link>
              <Link
                href="/apply"
                className="text-white hover:text-gray-300 hover:font-semibold transition-all font-medium font-inter"
              >
                For Advisors
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-main-text font-playfair mb-6">
              Join Our Vetted Network
            </h1>
            <p className="text-xl text-muted-text font-inter mb-8 max-w-3xl mx-auto">
              Are you a qualified McKenzie Friend or divorce support professional? 
              Help families navigate the court system while building a sustainable practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-main-text font-inter mb-6">Why Join Our Network?</h2>
              <ul className="space-y-4 text-muted-text font-inter">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cta-coral rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Access to pre-qualified clients actively seeking support</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cta-coral rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Professional profile listing with full control over your information</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cta-coral rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Set your own rates and availability</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cta-coral rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Part of a trusted, quality-focused directory</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cta-coral rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Direct client contact - no platform fees</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-main-text font-inter mb-6">Requirements</h2>
              <ul className="space-y-4 text-muted-text font-inter">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-tag-background rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Relevant qualifications or significant experience in family law support</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-tag-background rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Professional indemnity insurance</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-tag-background rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Commitment to ethical practice standards</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-tag-background rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>References from previous clients (where possible)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-tag-background rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Willingness to undergo verification process</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-content-area rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-main-text font-inter mb-4">Ready to Apply?</h3>
              <p className="text-muted-text font-inter mb-6">
                Send us your details and we'll get back to you within 48 hours to discuss next steps.
              </p>
              <Button className="bg-cta-coral hover:bg-cta-coral-hover text-white border-none rounded-full px-8 py-4 font-bold font-inter transition-all duration-300 hover:shadow-lg text-lg">
                <a href="mailto:apply@divorcecompass.co.uk?subject=Application to Join Network">
                  Send Application Email
                </a>
              </Button>
            </div>
            
            <p className="text-sm text-muted-text font-inter">
              Questions? Email us at{" "}
              <a href="mailto:hello@divorcecompass.co.uk" className="text-cta-coral hover:underline">
                hello@divorcecompass.co.uk
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
