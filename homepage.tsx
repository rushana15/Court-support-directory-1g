"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { mockProfessionals, type Professional } from "@/lib/mock-data"
import HeroSection from "@/components/hero-section"

export default function Homepage() {
  const [featuredProfessionals, setFeaturedProfessionals] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFeaturedProfessionals() {
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 500))

        // Get first 3 verified professionals, or first 3 if none verified
        const verified = mockProfessionals.filter((p) => p.verified)
        const featured = verified.length >= 3 ? verified.slice(0, 3) : mockProfessionals.slice(0, 3)
        setFeaturedProfessionals(featured)
      } catch (error) {
        console.error("Failed to load professionals:", error)
        setFeaturedProfessionals(mockProfessionals.slice(0, 3))
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedProfessionals()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header style={{ backgroundColor: "#002F5F" }} className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-[#B46E2B] font-playfair tracking-wider px-2 py-1">Court Support Network</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="#about"
                className="text-[#F5F1EA] hover:text-white hover:font-semibold transition-all font-medium font-opensans"
              >
                About
              </Link>
              <Link
                href="#how-it-works"
                className="text-[#F5F1EA] hover:text-white hover:font-semibold transition-all font-medium font-opensans"
              >
                How it Works
              </Link>
              <Link
                href="#contact"
                className="text-[#F5F1EA] hover:text-white hover:font-semibold transition-all font-medium font-opensans"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Profile Cards Section */}
      <section className="py-20" style={{ backgroundColor: "#F5F0E6" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 font-playfair">Featured McKenzie Friends</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-opensans leading-relaxed">
              Meet some of our verified McKenzie Friends ready to support you through your family court journey with
              expertise and compassion
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004A7F] mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 font-inter">Loading featured professionals...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {featuredProfessionals.map((professional) => (
                <Card
                  key={professional.id}
                  className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 h-full"
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Profile Photo and Verification */}
                    <div className="text-center mb-4 relative">
                      <Image
                        src={professional.image || "/placeholder.svg"}
                        alt={`${professional.name} profile photo`}
                        width={80}
                        height={80}
                        className="rounded-full mx-auto object-cover border-2 border-gray-100"
                      />
                      {professional.verified && (
                        <div className="absolute top-0 right-1/2 transform translate-x-8 -translate-y-1">
                          <CheckCircle className="h-5 w-5 text-green-600 bg-white rounded-full" />
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center font-playfair">{professional.name}</h3>
                    
                    {/* Expertise Description */}
                    <p className="text-sm text-gray-600 text-center mb-4 font-opensans italic">
                      {professional.id === "1" && "Specializing in complex custody arrangements and domestic violence cases"}
                      {professional.id === "2" && "Expert in financial settlements and property disputes"}
                      {professional.id === "3" && "Focused on child welfare and international family law"}
                      {!["1", "2", "3"].includes(professional.id) && "Experienced family court advocate"}
                    </p>

                    {/* Professional Details */}
                    <div className="space-y-2 mb-4 flex-grow">
                      {/* Location */}
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-sm text-gray-600 font-opensans">{professional.region}</span>
                      </div>

                      {/* Experience Level */}
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-sm text-gray-600 font-opensans">{professional.experienceLevel || "Not specified"}</span>
                      </div>
                    </div>

                    {/* Organized Tags */}
                    <div className="mb-6">
                      {/* Specialisms */}
                      <div className="mb-3">
                        <h4 className="text-xs font-semibold text-gray-500 mb-1 font-opensans">SPECIALISMS</h4>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {professional.specialisms.slice(0, 2).map((specialism, index) => (
                            <Badge
                              key={index}
                              className="bg-[#C2841F] text-white text-xs px-2 py-1 font-opensans font-medium"
                            >
                              {specialism}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {/* Fees */}
                      <div className="mb-3">
                        <h4 className="text-xs font-semibold text-gray-500 mb-1 font-opensans">FEES</h4>
                        <div className="flex justify-center">
                          <Badge className="bg-[#C2841F] text-white text-xs px-2 py-1 font-opensans font-medium">
                            {professional.rateInfo}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Urgency */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 mb-1 font-opensans">AVAILABILITY</h4>
                        <div className="flex justify-center">
                          <Badge className="bg-[#C2841F] text-white text-xs px-2 py-1 font-opensans font-medium">
                            {professional.id === "1" && "Same Day"}
                            {professional.id === "2" && "48 Hours"}
                            {professional.id === "3" && "1 Week"}
                            {!["1", "2", "3"].includes(professional.id) && "Available"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* View Profile Button */}
                    <div className="mt-auto">
                      <Button
                        className="bg-[#004A7F] hover:bg-[#003A6B] text-white w-full py-2.5 font-opensans font-semibold"
                        asChild
                      >
                        <Link href={`/profile/${professional.id}`}>View Profile</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white" id="how-it-works">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 font-playfair">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-opensans leading-relaxed">
              Getting the support you need is simple and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <Card className="bg-white shadow-lg border border-gray-200 text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#004A7F] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white font-playfair">1</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-playfair">Browse & Search</h3>
                <p className="text-gray-600 font-opensans leading-relaxed">
                  Explore our directory of verified McKenzie Friends. Filter by location, expertise, and availability to find the perfect match for your case.
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="bg-white shadow-lg border border-gray-200 text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#004A7F] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white font-playfair">2</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-playfair">Connect & Consult</h3>
                <p className="text-gray-600 font-opensans leading-relaxed">
                  Review detailed profiles and contact your chosen McKenzie Friend directly. Schedule an initial consultation to discuss your specific needs.
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="bg-white shadow-lg border border-gray-200 text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#004A7F] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white font-playfair">3</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-playfair">Get Support</h3>
                <p className="text-gray-600 font-opensans leading-relaxed">
                  Receive expert guidance and representation throughout your family court proceedings. Your McKenzie Friend will be with you every step of the way.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-20" style={{ backgroundColor: "#F5F0E6" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 font-playfair">Client Testimonials</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-opensans leading-relaxed">
              Hear from families who found the support they needed through our network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <Card className="bg-white shadow-lg border border-gray-200 p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="Sarah M."
                    width={50}
                    height={50}
                    className="rounded-full object-cover border-2 border-gray-100"
                  />
                  <div className="ml-3">
                    <h4 className="font-bold text-gray-900 font-playfair">Sarah M.</h4>
                    <p className="text-sm text-gray-600 font-opensans">London</p>
                  </div>
                </div>
                <p className="text-gray-700 font-opensans leading-relaxed italic">
                  "Finding Emma through Court Support Network was a lifesaver. Her expertise in custody matters and compassionate approach helped me navigate the most difficult time of my life."
                </p>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="bg-white shadow-lg border border-gray-200 p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="James K."
                    width={50}
                    height={50}
                    className="rounded-full object-cover border-2 border-gray-100"
                  />
                  <div className="ml-3">
                    <h4 className="font-bold text-gray-900 font-playfair">James K.</h4>
                    <p className="text-sm text-gray-600 font-opensans">Manchester</p>
                  </div>
                </div>
                <p className="text-gray-700 font-opensans leading-relaxed italic">
                  "Michael's knowledge of financial settlements was exceptional. He helped me understand complex legal documents and prepared me thoroughly for court hearings."
                </p>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="bg-white shadow-lg border border-gray-200 p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="Rachel T."
                    width={50}
                    height={50}
                    className="rounded-full object-cover border-2 border-gray-100"
                  />
                  <div className="ml-3">
                    <h4 className="font-bold text-gray-900 font-playfair">Rachel T.</h4>
                    <p className="text-sm text-gray-600 font-opensans">Birmingham</p>
                  </div>
                </div>
                <p className="text-gray-700 font-opensans leading-relaxed italic">
                  "The whole process was so much less intimidating with Sarah's support. She explained everything clearly and made sure I felt confident in court."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <span className="text-xl font-bold text-[#004A7F] font-playfair">Court Support Network</span>
            </div>

            <div className="flex items-center space-x-8">
              <div className="text-sm text-gray-600 font-opensans">
                © {new Date().getFullYear()} Court Support Network. All rights reserved.
              </div>
              <Link
                href="#"
                className="text-[#004A7F] hover:text-[#C2841F] font-medium transition-colors underline underline-offset-2 font-opensans"
              >
                Apply to be listed
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}