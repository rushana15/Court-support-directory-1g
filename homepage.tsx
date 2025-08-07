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
  const [foundingMembers, setFoundingMembers] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFoundingMembers() {
      try {
        console.log('Loading founding members...')
        const data = await fetchProfessionals()
        console.log('Received data:', data)
        console.log('Data length:', data?.length || 0)

        // Show first 3 professionals with the "Founding Member" checkbox ticked
        const founding = data.filter(p => p["Founding Member"]).slice(0, 3)
        console.log('Founding members:', founding)
        setFoundingMembers(founding)
      } catch (error) {
        console.error("Failed to load founding members:", error)
        setFoundingMembers([])
      } finally {
        setLoading(false)
      }
    }

    loadFoundingMembers()
  }, [])

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Header */}
      <header className="bg-header-footer border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-3xl font-bold text-white font-playfair tracking-wide">Court Support Network</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="#about"
                className="text-white hover:text-gray-300 hover:font-semibold transition-all font-medium font-inter"
              >
                About
              </Link>
              <Link
                href="#how-it-works"
                className="text-white hover:text-gray-300 hover:font-semibold transition-all font-medium font-inter"
              >
                How it Works
              </Link>
              <Link
                href="#contact"
                className="text-white hover:text-gray-300 hover:font-semibold transition-all font-medium font-inter"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

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

      {/* Founding Members Section */}
      <section className="py-20 bg-[#E0E0E0]"> {/* Lighter grey for better contrast */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-playfair text-main-text">Founding Members</h2>
            <p className="text-xl mb-12 font-inter text-main-text">These early advisors helped shape the platform. More joining soon.</p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C2C2C] mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 font-inter">Loading founding members...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {foundingMembers.map((member) => (
                <Card
                  key={member.id}
                  className="bg-[#FDFDF9] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out border border-gray-100 h-full"
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Profile Photo and Verification */}
                    <div className="text-center mb-4 relative">
                      <Image
                        src={member["Profile Photo"] || "/placeholder.svg"}
                        alt={`${member["Name"]} profile photo`}
                        width={100}
                        height={100}
                        className="rounded-full mx-auto object-cover border-2 border-gray-100"
                      />
                      {/* Removed verification badge as it's not relevant for founding members */}
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold mb-2 font-playfair text-main-text text-center">{member["Name"]}</h3>

                    {/* Professional Details - Simplified for founding members */}
                    <div className="space-y-3 mb-6 flex-grow">
                      {/* Role or Title */}
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-muted-text rounded-full"></div>
                        <span className="text-sm text-muted-text font-inter">{member["Role"] || "Advisor"}</span> {/* Assuming a "Role" field or similar */}
                      </div>

                      {/* Contact Info (e.g., email or website, if available and appropriate) */}
                      {member["Contact Info"] && (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-muted-text rounded-full"></div>
                          <span className="text-sm text-muted-text font-inter">{member["Contact Info"]}</span>
                        </div>
                      )}
                    </div>

                    {/* Specialisms - May not be applicable or different for founding members */}
                    {/* If specialisms are still relevant, keep this block. Otherwise, consider removing or adapting. */}
                    <div className="flex flex-wrap gap-1 justify-center mb-6">
                      {(member["Specialisms"] || []).slice(0, 3).map((specialism: string, index: number) => (
                        <Badge key={index} className="bg-tag-background text-tag-text hover:bg-gray-600 transition-colors text-sm font-inter rounded-full px-4 py-2 inline-block mx-1 my-1">
                          {specialism}
                        </Badge>
                      ))}
                    </div>

                    {/* Optional: Button to learn more about the member or their contribution */}
                    {/* This can be adapted or removed based on specific needs */}
                    <div className="mt-auto">
                      {/* Removed "View Profile" button as it might not be applicable for founding members */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {/* The "Browse Directory" button remains relevant for general users */}
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
      <footer className="py-16 bg-header-footer border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <span className="text-xl font-bold text-white font-playfair">Court Support Network</span>
            </div>

            <div className="flex items-center space-x-8">
              <div className="text-sm text-gray-300 font-inter">
                © {new Date().getFullYear()} Court Support Network. All rights reserved.
              </div>
              <Link
                href="#"
                className="text-white hover:text-gray-300 font-medium transition-colors underline underline-offset-2 font-inter"
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