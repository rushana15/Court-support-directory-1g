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

        // Since no founding members are set in Airtable yet, show first 3 professionals as display members
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
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/compass-logo.svg"
                alt="Divorce Compass Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
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

      {/* Hero Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          {/* Main Heading - Full Width at Top */}
          <div className="text-center mb-4">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair text-main-text">
              UK's First Fully Vetted Divorce Support Directory
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Left Column - Text Content */}
            <div className="text-left self-start">
              {/* Subheading */}
              <h2 className="text-xl md:text-2xl font-bold mb-6 font-playfair leading-tight text-main-text">
                Divorce Support You Can Trust — Experts for Court, Conflict & Co-Parenting
              </h2>
              
              {/* Descriptive text */}
              <p className="text-lg md:text-xl mb-8 font-inter leading-relaxed text-main-text">
                Every professional listed here has been personally interviewed and reference-checked, with proven experience helping people through divorce and co-parenting challenges.
              </p>

              {/* Buttons */}
              <div className="mt-6 flex gap-3">
                <Link
                  href="/directory"
                  className="inline-flex items-center rounded-full bg-[#E76F51] hover:bg-[#D14A3E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition font-inter"
                >
                  Browse the Directory
                </Link>
                <Link
                  href="#about"
                  className="inline-flex items-center rounded-full border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition font-inter"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative self-start max-w-[540px]">
              <div className="rounded-3xl shadow-md border bg-white p-2">
                <Image
                  src="/hero-banner.png"
                  alt="Professional consultation"
                  width={600}
                  height={400}
                  className="object-cover rounded-3xl w-full h-auto"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Different Section */}
      <section id="why-different" className="py-16 md:py-24 bg-[#f7f7f7]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Centered heading section */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-main-text font-playfair">
              Why We're Different
            </h2>
            <p className="mt-2 text-lg text-main-text font-inter leading-relaxed">
              The UK's first fully vetted directory for McKenzie Friends and divorce support professionals.
            </p>
            <p className="mt-1 text-sm opacity-80 text-main-text font-inter">
              Interviewed • Reference-checked • Experience-verified
            </p>
          </div>

          {/* Cards Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Vetted First Card */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
              <svg
                className="w-6 h-6 text-header-footer mb-3"
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
              <h3 className="font-semibold text-main-text font-playfair mb-2">
                Vetted First (no exceptions)
              </h3>
              <p className="text-sm leading-6 opacity-90 text-main-text font-inter">
                Every professional is interviewed, reference-checked, and screened for relevant experience before listing. We review work history, client feedback, and platform reviews so you don't have to.
              </p>
            </div>

            {/* Handpicked Start Card */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
              <svg
                className="w-6 h-6 text-header-footer mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <h3 className="font-semibold text-main-text font-playfair mb-2">
                Handpicked Start
              </h3>
              <p className="text-sm leading-6 opacity-90 text-main-text font-inter">
                Our initial network was handpicked based on reviews and outcomes across multiple platforms, then verified through interviews and references.
              </p>
            </div>

            {/* No Commission Card */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
              <svg
                className="w-6 h-6 text-header-footer mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="font-semibold text-main-text font-playfair mb-2">
                No Commission Model
              </h3>
              <p className="text-sm leading-6 opacity-90 text-main-text font-inter">
                We charge a monthly membership fee to professionals, not a commission per case. This keeps costs transparent and in your control.
              </p>
            </div>

            {/* Real People Card */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
              <svg
                className="w-6 h-6 text-header-footer mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="font-semibold text-main-text font-playfair mb-2">
                Real People Behind the Profiles
              </h3>
              <p className="text-sm leading-6 opacity-90 text-main-text font-inter">
                No automated listings or basic contact forms. Every professional you see has been personally interviewed by our team.
              </p>
            </div>
          </div>

          {/* Footer reassurance line */}
          <div className="mt-6 text-xs opacity-70 text-center">
            <p className="text-main-text font-inter">
              If someone doesn't meet our standards, they don't make the list. Period.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-[#F4F4F4]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 font-playfair text-center text-main-text">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-cta-coral rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl font-playfair">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 font-playfair text-main-text">Browse Profiles</h3>
              <p className="text-lg text-main-text font-inter leading-relaxed">
                Easily find McKenzie Friends by location, specialism, and experience.
              </p>
            </div>
            {/* Step 2 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-cta-coral rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl font-playfair">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 font-playfair text-main-text">Connect Directly</h3>
              <p className="text-lg text-main-text font-inter leading-relaxed">
                Message professionals securely through our platform to discuss your needs.
              </p>
            </div>
            {/* Step 3 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-cta-coral rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl font-playfair">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 font-playfair text-main-text">Get Support</h3>
              <p className="text-lg text-main-text font-inter leading-relaxed">
                Receive compassionate and expert assistance for your court proceedings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Members Section */}
      <section className="py-20 bg-[#E0E0E0]">
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
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold mb-2 font-playfair text-main-text text-center">{member["Name"]}</h3>

                    {/* Professional Details - Simplified for founding members */}
                    <div className="space-y-3 mb-6 flex-grow">
                      {/* Role or Title */}
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-muted-text rounded-full"></div>
                        <span className="text-sm text-muted-text font-inter">{member["Role"] || "Advisor"}</span>
                      </div>

                      {/* Contact Info (e.g., email or website, if available and appropriate) */}
                      {member["Contact Info"] && (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-muted-text rounded-full"></div>
                          <span className="text-sm text-muted-text font-inter">{member["Contact Info"]}</span>
                        </div>
                      )}

                      {/* Rate Info */}
                      {member["Rate Info"] && (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-muted-text rounded-full"></div>
                          <span className="text-sm text-muted-text font-inter">{member["Rate Info"]}</span>
                        </div>
                      )}
                    </div>

                    {/* Expertise */}
                    <div className="flex flex-wrap gap-1 justify-center mb-6">
                      {(member["Expertise"] || []).slice(0, 3).map((expertise: string, index: number) => (
                        <Badge key={index} className="bg-[#D8D8D8] text-gray-700 hover:bg-gray-400 transition-colors text-sm font-inter rounded-full px-4 py-2 inline-block mx-1 my-1">
                          {expertise}
                        </Badge>
                      ))}
                    </div>

                    {/* View Profile Button */}
                    <div className="text-center mt-auto">
                      <Button
                        className="bg-cta-coral hover:bg-cta-coral-hover text-white w-full px-6 py-3 font-inter font-bold rounded-full border-none transition-all duration-300"
                        asChild
                      >
                        <Link href={`/profile/${member.id}`}>View Profile</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {/* The "Browse Directory" button remains relevant for general users */}
          <div className="text-center mt-16">
            <Button
              className="bg-cta-coral hover:bg-cta-coral-hover text-white border-none rounded-full px-8 py-4 font-bold font-inter transition-all duration-300 hover:shadow-lg text-lg"
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
          <form 
            className="max-w-2xl mx-auto space-y-6"
            onSubmit={async (e) => {
              e.preventDefault()
              
              const formData = new FormData(e.target as HTMLFormElement)
              const data = {
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                message: formData.get('message') as string,
              }

              try {
                const response = await fetch('/api/send-email', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                })

                if (response.ok) {
                  alert('Message sent successfully!')
                  ;(e.target as HTMLFormElement).reset()
                } else {
                  const errorData = await response.json()
                  alert(`Error: ${errorData.error}`)
                }
              } catch (error) {
                alert('Failed to send message. Please try again.')
                console.error('Error:', error)
              }
            }}
          >
            <div>
              <label htmlFor="name" className="block text-left text-lg font-medium font-inter mb-2 text-main-text">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
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
                name="email"
                required
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
                name="message"
                rows={6}
                required
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
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <Image
                src="/compass-logo.svg"
                alt="Divorce Compass Logo"
                width={24}
                height={24}
                className="w-6 h-6"
              />
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