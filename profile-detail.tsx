"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, ArrowLeft, CheckCircle, ExternalLink, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { fetchProfessionals, type Professional } from "@/lib/airtable"
import ProfessionalContactForm from "@/components/professional-contact-form"

export default function ProfileDetail() {
  const params = useParams()
  const profileId = params?.id
  const [professional, setProfessional] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfessional() {
      try {
        const professionals = await fetchProfessionals()
        const foundProfessional = professionals.find(p => p.id === profileId)
        setProfessional(foundProfessional || null)
      } catch (error) {
        console.error("Failed to load professional:", error)
        setProfessional(null)
      } finally {
        setLoading(false)
      }
    }

    if (profileId) {
      loadProfessional()
    } else {
      setLoading(false)
    }
  }, [profileId])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-inter">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!professional) {
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

        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 font-merriweather">Professional Not Found</h1>
            <p className="text-gray-600 mb-6 font-inter">The professional you're looking for doesn't exist.</p>
            <Button asChild className="bg-primary-green hover:bg-primary-green/90 text-white font-inter">
              <Link href="/directory">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Directory
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

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

      {/* Back Button */}
      <div className="bg-soft-white py-4">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="text-primary-green hover:text-muted-gold font-inter">
            <Link href="/directory">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Directory
            </Link>
          </Button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Profile Photo and Basic Info */}
            <div className="md:col-span-1">
              <Card className="bg-white shadow-lg border border-gray-200">
                <CardContent className="p-6 text-center">
                  {/* Profile Photo */}
                  <div className="relative mb-6">
                    <Image
                      src={professional["Profile Photo"] || "/placeholder.svg"}
                      alt={`${professional["Name"]} profile photo`}
                      width={200}
                      height={200}
                      className="rounded-lg mx-auto object-cover border-2 border-gray-100"
                    />
                    {professional["Verified"] && (
                      <div className="absolute -top-2 -right-2">
                        <CheckCircle className="h-8 w-8 text-green-600 bg-white rounded-full shadow-lg" />
                      </div>
                    )}
                  </div>

                  {/* Name and Title */}
                  <h1 className="text-2xl font-bold text-primary-green mb-2 font-playfair">{professional["Name"]}</h1>
                  <p className="text-lg text-primary-green mb-4 font-inter font-semibold">McKenzie Friend</p>

                  {/* Location */}
                  <div className="flex items-center justify-center mb-4">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600 font-inter">{professional["Region"]}</span>
                  </div>

                  {/* Experience Level */}
                  <div className="mb-4">
                    <Badge className="bg-deep-taupe text-white px-3 py-1 font-inter rounded-full">
                      {professional["Experience Level"]}
                    </Badge>
                  </div>

                  {/* Rate Info */}
                  <div className="mb-6">
                    <p className="text-lg font-semibold text-gray-900 font-inter">{professional["Rate Info"]}</p>
                  </div>

                  {/* Verification Status */}
                  {professional["Verified"] && professional["Last Verified Date"] && (
                    <div className="flex items-center justify-center mb-6 text-sm text-gray-500 font-inter">
                      <Calendar className="h-4 w-4 mr-2" />
                      Verified: {new Date(professional["Last Verified Date"]).toLocaleDateString()}
                    </div>
                  )}

                  {/* LinkedIn Profile */}
                  {professional["LinkedIn Profile Link"] && (
                    <Button
                        variant="outline"
                        className="w-full border-primary-green text-primary-green hover:bg-primary-green hover:text-white px-8 py-4 font-inter rounded-full hover:ring-2 hover:ring-primary-green/30 transition-all duration-300"
                        asChild
                      >
                        <Link href={professional["LinkedIn Profile Link"]} target="_blank" rel="noopener noreferrer">
                          View LinkedIn Profile
                        </Link>
                      </Button>
                  )}

                  {/* Contact Button - This will be replaced by the form or the message */}
                  {!professional["Is Accepting Inquiries"] ? (
                    <div className="mt-6 text-center">
                      <p className="text-gray-600 font-inter">This professional isn’t accepting new inquiries.</p>
                      <Button asChild className="mt-4 bg-primary-green hover:bg-primary-green/85 text-white px-8 py-4 font-inter font-semibold rounded-full hover:ring-2 hover:ring-primary-green/30 transition-all duration-300">
                        <Link href="/directory">
                          Browse Directory
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full bg-primary-green hover:bg-primary-green/85 text-white px-8 py-4 font-inter font-semibold rounded-full hover:ring-2 hover:ring-primary-green/30 transition-all duration-300">
                      Contact McKenzie Friend
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Detailed Information */}
            <div className="md:col-span-2 space-y-6">
              {/* About Section */}
              <Card className="bg-white shadow-lg border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-primary-green font-playfair">About</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-600 leading-relaxed font-inter">
                    {(professional["Long Bio"] || professional["Short Bio"])
                      .split('\n')
                      .filter(paragraph => paragraph.trim() !== '')
                      .map((paragraph, index) => (
                        <p key={index} className="mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Specialisms Section */}
              {professional["Specialisms"] && Array.isArray(professional["Specialisms"]) && professional["Specialisms"].length > 0 && (
                <Card className="bg-white shadow-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary-green font-playfair">Areas of Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {professional["Specialisms"].map((specialism: string, index: number) => (
                        <Badge key={index} className="bg-deep-taupe text-white hover:bg-muted-gold transition-colors text-xs font-inter rounded-full px-3 py-1">
                          {specialism}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Languages Section */}
              {professional["Languages Spoken"] && professional["Languages Spoken"].length > 0 && (
                <Card className="bg-white shadow-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary-green font-playfair">Languages Spoken</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 font-inter">
                      {Array.isArray(professional["Languages Spoken"])
                        ? professional["Languages Spoken"].join(", ")
                        : professional["Languages Spoken"]}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Contact Form Section */}
              {professional["Is Accepting Inquiries"] && (
                <Card className="bg-white shadow-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary-green font-playfair">Contact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProfessionalContactForm
                      displayName={professional["Display Name"]}
                      slug={professional["Slug"]}
                    />
                    <p className="text-xs text-gray-500 mt-2 font-inter text-center">
                      Your message goes straight to this professional. Their email stays private.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 bg-soft-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-deep-taupe rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm font-playfair">CSN</span>
              </div>
              <span className="text-xl font-bold text-primary-green font-playfair">Court Support Network</span>
            </div>

            <div className="flex items-center space-x-8">
              <div className="text-sm text-gray-600 font-inter">
                © {new Date().getFullYear()} Court Support Network. All rights reserved.
              </div>
              <Link
                href="#"
                className="text-primary-green hover:text-muted-gold font-medium transition-colors underline underline-offset-2 font-inter"
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