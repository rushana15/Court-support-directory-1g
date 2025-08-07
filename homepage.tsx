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
        console.log('All professionals founding member status:', data.map(p => ({ name: p.Name, foundingMember: p["Founding Member"] })))

        // If no founding members found, show first 3 professionals as fallback for now
        const displayMembers = founding.length > 0 ? founding : data.slice(0, 3)
        setFoundingMembers(displayMembers)
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
              <span className="text-3xl font-bold text-white font-playfair tracking-wide">Divorce Compass</span>
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

      {/* Why We're Different Section */}
      <section id="why-different" className="py-16 md:py-24 bg-content-area">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Heading and Intro */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-main-text mb-4 font-playfair">
                Why We're Different
              </h2>
              <p className="text-lg text-main-text font-inter max-w-prose">
                We've built the first truly vetted directory for McKenzie Friends and divorce support professionals.
              </p>
            </div>

            {/* Right Column - 2x2 Grid of Feature Cards */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Vetted First Card */}
                <div className="rounded-2xl p-6 shadow-sm border border-gray-200 bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-primary-background mr-3">
                      <svg
                        className="w-6 h-6 text-header-footer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-main-text font-playfair">
                      Vetted First (no exceptions)
                    </h3>
                  </div>
                  <p className="text-sm text-main-text font-inter leading-relaxed">
                    Every professional is interviewed, reference-checked, and screened for relevant experience before listing. We review work history, client feedback, and platform reviews so you don't have to.
                  </p>
                </div>

                {/* Direct Contact Card */}
                <div className="rounded-2xl p-6 shadow-sm border border-gray-200 bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-primary-background mr-3">
                      <svg
                        className="w-6 h-6 text-header-footer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-main-text font-playfair">
                      Direct Contact — No Hidden Fees
                    </h3>
                  </div>
                  <p className="text-sm text-main-text font-inter leading-relaxed">
                    Message or book directly. No paywalls, no gatekeeping, no commissions added on top. What you agree with your advisor is what you pay.
                  </p>
                </div>

                {/* Easy to Browse Card */}
                <div className="rounded-2xl p-6 shadow-sm border border-gray-200 bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-primary-background mr-3">
                      <svg
                        className="w-6 h-6 text-header-footer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-main-text font-playfair">
                      Easy to Browse, Fast to Decide
                    </h3>
                  </div>
                  <p className="text-sm text-main-text font-inter leading-relaxed">
                    Clear profiles with specialisms, pricing, locations, and availability. Filters help you find the right support in minutes.
                  </p>
                </div>

                {/* Founding Partners Card */}
                <div className="rounded-2xl p-6 shadow-sm border border-gray-200 bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-primary-background mr-3">
                      <svg
                        className="w-6 h-6 text-header-footer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-main-text font-playfair">
                      Founding Partners, Personally Selected
                    </h3>
                  </div>
                  <p className="text-sm text-main-text font-inter leading-relaxed">
                    Our initial network was handpicked based on reviews and outcomes across multiple platforms, then verified through interviews and references.
                  </p>
                </div>
              </div>

              {/* Reassurance Line */}
              <div className="text-center mt-8">
                <p className="text-sm text-main-text opacity-80 font-inter">
                  If someone doesn't meet our standards, they don't make the list. Period.
                </p>
              </div>
            </div>
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

      {/* About Section */}
      <section id="about" className="py-16 lg:py-24 bg-content-area">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-main-text font-playfair">
              What is a McKenzie Friend?
            </h2>
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
              <span className="text-xl font-bold text-white font-playfair">Divorce Compass</span>
            </div>

            <div className="flex items-center space-x-8">
              <div className="text-sm text-gray-300 font-inter">
                © {new Date().getFullYear()} Divorce Compass. All rights reserved.
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