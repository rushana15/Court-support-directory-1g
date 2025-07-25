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
import { mockProfessionals, type Professional } from "@/lib/mock-data"

export default function ProfileDetail() {
  const params = useParams()
  const profileId = params?.id
  const [professional, setProfessional] = useState<Professional | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfessional() {
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 500))

        const foundProfessional = mockProfessionals.find(p => p.id === profileId)
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004A7F] mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-inter">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!professional) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header style={{ backgroundColor: "#002F5F" }} className="border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center">
                <span className="text-3xl font-bold text-[#F3E9DC] font-merriweather tracking-wide">Court Support Network</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 font-merriweather">Professional Not Found</h1>
            <p className="text-gray-600 mb-6 font-inter">The professional you're looking for doesn't exist.</p>
            <Button asChild className="bg-[#004A7F] hover:bg-[#003A6B] text-white font-inter">
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header style={{ backgroundColor: "#002F5F" }} className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-3xl font-bold text-[#F3E9DC] font-merriweather tracking-wide">Court Support Network</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="#about"
                className="text-[#F5F1EA] hover:text-white hover:font-semibold transition-all font-medium font-inter"
              >
                About
              </Link>
              <Link
                href="#how-it-works"
                className="text-[#F5F1EA] hover:text-white hover:font-semibold transition-all font-medium font-inter"
              >
                How it Works
              </Link>
              <Link
                href="#contact"
                className="text-[#F5F1EA] hover:text-white hover:font-semibold transition-all font-medium font-inter"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="text-[#004A7F] hover:text-[#F7941D] font-inter">
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
                      src={professional.image || "/placeholder.svg"}
                      alt={`${professional.name} profile photo`}
                      width={200}
                      height={200}
                      className="rounded-lg mx-auto object-cover border-2 border-gray-100"
                    />
                    {professional.verified && (
                      <div className="absolute -top-2 -right-2">
                        <CheckCircle className="h-8 w-8 text-green-600 bg-white rounded-full shadow-lg" />
                      </div>
                    )}
                  </div>

                  {/* Name and Title */}
                  <h1 className="text-2xl font-bold text-gray-900 mb-2 font-merriweather">{professional.name}</h1>
                  <p className="text-lg text-[#004A7F] mb-4 font-inter font-semibold">McKenzie Friend</p>

                  {/* Location */}
                  <div className="flex items-center justify-center mb-4">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600 font-inter">{professional.region}</span>
                  </div>

                  {/* Experience Level */}
                  <div className="mb-4">
                    <Badge className="bg-[#F7941D] text-white px-3 py-1 font-inter">
                      {professional.experienceLevel} Level
                    </Badge>
                  </div>

                  {/* Rate Info */}
                  <div className="mb-6">
                    <p className="text-lg font-semibold text-gray-900 font-inter">{professional.rateInfo}</p>
                  </div>

                  {/* Verification Status */}
                  {professional.verified && professional.lastVerified && (
                    <div className="flex items-center justify-center mb-6 text-sm text-gray-500 font-inter">
                      <Calendar className="h-4 w-4 mr-2" />
                      Verified: {new Date(professional.lastVerified).toLocaleDateString()}
                    </div>
                  )}

                  {/* LinkedIn Profile */}
                  {professional.linkedinUrl && (
                    <Button
                      variant="outline"
                      className="w-full mb-4 font-inter"
                      asChild
                    >
                      <Link href={professional.linkedinUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        LinkedIn Profile
                      </Link>
                    </Button>
                  )}

                  {/* Contact Button */}
                  <Button className="w-full bg-[#004A7F] hover:bg-[#003A6B] text-white font-inter font-semibold">
                    Contact McKenzie Friend
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Detailed Information */}
            <div className="md:col-span-2 space-y-6">
              {/* About Section */}
              <Card className="bg-white shadow-lg border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 font-merriweather">About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed font-inter">{professional.bio}</p>
                </CardContent>
              </Card>

              {/* Specialisms */}
              <Card className="bg-white shadow-lg border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 font-merriweather">Areas of Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {professional.specialisms.map((specialism, index) => (
                      <Badge
                        key={index}
                        className="bg-[#F7941D] text-white hover:bg-[#E8851A] transition-colors font-inter"
                      >
                        {specialism}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Support Options */}
              <Card className="bg-white shadow-lg border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 font-merriweather">Support Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {professional.supportOptions.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700 font-inter">{option}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card className="bg-white shadow-lg border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 font-merriweather">Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {professional.languages.map((language, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-[#004A7F] text-[#004A7F] font-inter"
                      >
                        {language}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-[#F7941D] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm font-merriweather">CSN</span>
              </div>
              <span className="text-xl font-bold text-[#004A7F] font-merriweather">Court Support Network</span>
            </div>

            <div className="flex items-center space-x-8">
              <div className="text-sm text-gray-600 font-inter">
                © {new Date().getFullYear()} Court Support Network. All rights reserved.
              </div>
              <Link
                href="#"
                className="text-[#004A7F] hover:text-[#F7941D] font-medium transition-colors underline underline-offset-2 font-inter"
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