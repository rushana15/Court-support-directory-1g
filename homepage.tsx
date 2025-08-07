"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MapPin, Search, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { fetchProfessionals, type Professional } from "@/lib/airtable"
import HeroSection from "@/components/hero-section"


export default function Homepage() {
  const [featuredProfessionals, setFeaturedProfessionals] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFeaturedProfessionals() {
      try {
        console.log('Loading featured professionals...')
        const data = await fetchProfessionals()
        console.log('Received data:', data)
        console.log('Data length:', data?.length || 0)

        // Show first 3 verified professionals
        const featured = data.filter(p => p["Verified"]).slice(0, 3)
        console.log('Featured professionals:', featured)
        setFeaturedProfessionals(featured)
      } catch (error) {
        console.error("Failed to load featured professionals:", error)
        setFeaturedProfessionals([])
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedProfessionals()
  }, [])

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Header */}
      <header className="bg-header-footer border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl font-bold font-playfair tracking-wide text-white">Court Support Network</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="#about"
                className="text-white hover:text-gray-200 hover:font-semibold transition-all font-medium font-inter"
              >
                About
              </Link>
              <Link
                href="#how-it-works"
                className="text-white hover:text-gray-200 hover:font-semibold transition-all font-medium font-inter"
              >
                How it Works
              </Link>
              <Link
                href="#contact"
                className="text-white hover:text-gray-200 hover:font-semibold transition-all font-medium font-inter"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="py-20 bg-[#D8D8D8]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 font-playfair text-main-text">About McKenzie Friends</h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed font-inter text-main-text">
              Meet some of our verified McKenzie Friends ready to support you through your family court journey with
              expertise and compassion
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-[#F4F4F4]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 font-playfair text-center text-main-text">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 font-playfair text-main-text">Browse Profiles</h3>
              <p className="text-lg text-main-text font-inter">
                Easily find McKenzie Friends by location, specialism, and experience.
              </p>
            </div>
            {/* Step 2 */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 font-playfair text-main-text">Connect Directly</h3>
              <p className="text-lg text-main-text font-inter">
                Message professionals securely through our platform to discuss your needs.
              </p>
            </div>
            {/* Step 3 */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 font-playfair text-main-text">Get Support</h3>
              <p className="text-lg text-main-text font-inter">
                Receive compassionate and expert assistance for your court proceedings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-20 bg-[#D8D8D8]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-playfair text-main-text">Featured McKenzie Friends</h2>
            <p className="text-xl mb-12 font-inter text-main-text">Meet some of our most experienced professionals</p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C2C2C] mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 font-inter">Loading featured professionals...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featuredProfessionals.map((professional) => (
                <Card
                  key={professional.id}
                  className="bg-[#FDFDF9] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out border border-gray-100 h-full"
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Profile Photo and Verification */}
                    <div className="text-center mb-4 relative">
                      <Image
                        src={professional["Profile Photo"] || "/placeholder.svg"}
                        alt={`${professional["Name"]} profile photo`}
                        width={100}
                        height={100}
                        className="rounded-full mx-auto object-cover border-2 border-gray-100"
                      />
                      {professional["Verified"] && (
                        <div className="absolute top-0 right-1/2 transform translate-x-12 -translate-y-1">
                          <CheckCircle className="h-6 w-6 text-green-600 bg-white rounded-full" />
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold mb-2 font-playfair text-main-text text-center">{professional["Name"]}</h3>

                    {/* Professional Details */}
                    <div className="space-y-3 mb-6 flex-grow">
                      {/* Location */}
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-muted-text rounded-full"></div>
                        <span className="text-sm text-muted-text font-inter">{professional["Region"]}</span>
                      </div>

                      {/* Experience Level */}
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-muted-text rounded-full"></div>
                        <span className="text-sm text-muted-text font-inter">{professional["Experience Level"] || "Not specified"}</span>
                      </div>

                      {/* Rate */}
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-muted-text rounded-full"></div>
                        <span className="text-sm text-muted-text font-inter">{professional["Rate Info"]}</span>
                      </div>
                    </div>

                    {/* Specialisms - Updated styling */}
                    <div className="flex flex-wrap gap-1 justify-center mb-6">
                      {(professional["Specialisms"] || []).slice(0, 3).map((specialism, index) => (
                        <Badge
                          key={index}
                          className="bg-tag-dark text-white text-xs px-3 py-2 font-inter font-medium rounded-full hover:bg-tag-dark/90 transition-colors"
                          style={{ fontSize: '0.85rem', padding: '0.4rem 0.9rem', borderRadius: '20px', margin: '0.25rem 0.25rem 0 0' }}
                        >
                          {specialism}
                        </Badge>
                      ))}
                    </div>

                    {/* View Profile Button */}
                    <div className="mt-auto">
                      <Button
                        className="bg-cta-coral hover:bg-cta-coral-hover text-white w-full font-inter font-bold transition-all duration-300 rounded-full px-6 py-3"
                        style={{ borderRadius: '30px', padding: '0.75rem 1.5rem' }}
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
          <div className="text-center mt-16">
            <Button
              className="bg-cta-coral hover:bg-cta-coral-hover text-white px-8 py-3 font-inter font-bold rounded-full hover:ring-2 hover:ring-cta-coral/30 transition-all duration-300"
              style={{ borderRadius: '30px', padding: '0.75rem 1.5rem' }}
              asChild
            >
              <Link href="/directory">Browse Directory</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#C4DEC6]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 font-playfair text-main-text">Get In Touch</h2>
          <p className="text-xl mb-12 font-inter text-main-text">
            Have questions or need assistance? Reach out to us today.
          </p>
          <form className="max-w-2xl mx-auto space-y-6">
            <div>
              <label htmlFor="name" className="block text-left text-lg font-medium font-inter mb-2 text-main-text">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cta-coral font-inter bg-input-bg text-main-text"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-left text-lg font-medium font-inter mb-2 text-main-text">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cta-coral font-inter bg-input-bg text-main-text"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-left text-lg font-medium font-inter mb-2 text-main-text">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cta-coral font-inter bg-input-bg text-main-text"
                placeholder="Your Message"
              ></textarea>
            </div>
            <Button
              className="bg-cta-coral hover:bg-cta-coral-hover text-white px-8 py-4 text-lg font-bold font-inter transition-all duration-300"
              style={{ borderRadius: '30px', padding: '0.75rem 1.5rem' }}
              type="submit"
            >
              Send Message
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#D8D8D8] border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <span className="text-xl font-bold font-playfair text-main-text">Court Support Network</span>
            </div>

            <div className="flex items-center space-x-8">
              <div className="text-sm text-muted-text font-inter">
                © {new Date().getFullYear()} Court Support Network. All rights reserved.
              </div>
              <Link
                href="#"
                className="text-main-text hover:text-cta-coral font-medium transition-colors underline underline-offset-2 font-inter"
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