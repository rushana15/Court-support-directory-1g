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

interface AirtableRecord {
  id: string
  fields: {
    Name?: string
    "Short Bio"?: string
    Region?: string
    Specialisms?: string[]
    "Experience Level"?: string
    "Languages Spoken"?: string[]
    Verified?: boolean
    "Rate Info"?: string
    "LinkedIn Profile Link"?: string
    "Profile Photo"?: Array<{
      id: string
      url: string
      filename: string
    }>
    "Last Verified Date"?: string
    "Support Options"?: string[]
  }
}

interface Professional {
  id: string
  name: string
  image: string
  region: string
  specialisms: string[]
  bio: string
  experienceLevel: string
  languages: string[]
  verified: boolean
  rateInfo: string
  linkedinUrl: string
  lastVerified: string
  supportOptions: string[]
}

// Fallback data in case Airtable API is unavailable
const fallbackProfessionals: Professional[] = [
  {
    id: "fallback-1",
    name: "Sarah Johnson",
    image: "/placeholder.svg?height=200&width=200&text=Sarah+Johnson",
    region: "London",
    specialisms: ["Child Arrangements", "Financial Disputes", "Domestic Violence"],
    bio: "Experienced McKenzie Friend with over 8 years supporting families through court proceedings. Specializes in child arrangement orders and financial disputes. Sarah has helped over 200 families navigate the complex family court system, providing compassionate support during difficult times. She has extensive experience with emergency applications, interim hearings, and final hearings. Sarah is particularly skilled at helping clients prepare their case documentation and understand court procedures.",
    experienceLevel: "Senior",
    languages: ["English", "French"],
    verified: true,
    rateInfo: "£50-80 per hour",
    linkedinUrl: "",
    lastVerified: "2024-01-15",
    supportOptions: [
      "Court Accompaniment",
      "Document Preparation",
      "Case Strategy",
      "Emergency Applications",
      "Interim Hearings",
    ],
  },
  {
    id: "fallback-2",
    name: "Michael Chen",
    image: "/placeholder.svg?height=200&width=200&text=Michael+Chen",
    region: "Manchester",
    specialisms: ["Property Disputes", "Child Support", "Mediation"],
    bio: "Qualified mediator and McKenzie Friend helping families resolve disputes outside of court when possible. Strong background in property and financial matters. Michael brings 6 years of experience in family law support, with a particular focus on helping families reach amicable agreements. He has successfully mediated over 150 cases, helping families avoid lengthy court proceedings. Michael's approach combines legal knowledge with emotional intelligence to support families through challenging transitions.",
    experienceLevel: "Intermediate",
    languages: ["English", "Mandarin"],
    verified: true,
    rateInfo: "£40-60 per hour",
    linkedinUrl: "",
    lastVerified: "2024-01-10",
    supportOptions: [
      "Mediation Support",
      "Document Review",
      "Court Preparation",
      "Property Valuations",
      "Financial Disclosure",
    ],
  },
  {
    id: "fallback-3",
    name: "Emma Williams",
    image: "/placeholder.svg?height=200&width=200&text=Emma+Williams",
    region: "Birmingham",
    specialisms: ["Domestic Violence", "Emergency Applications", "Child Protection"],
    bio: "Former social worker now providing McKenzie Friend services. Specializes in urgent applications and domestic violence cases with a compassionate approach. Emma has 10 years of experience in child protection and domestic violence support. She understands the urgency and sensitivity required in these cases and provides trauma-informed support. Emma has helped secure over 100 protective orders and has extensive experience with emergency court applications, often available at short notice for urgent situations.",
    experienceLevel: "Senior",
    languages: ["English", "Welsh"],
    verified: true,
    rateInfo: "£45-70 per hour",
    linkedinUrl: "",
    lastVerified: "2024-01-20",
    supportOptions: [
      "Emergency Support",
      "Safety Planning",
      "Court Accompaniment",
      "Protective Orders",
      "Crisis Intervention",
    ],
  },
  {
    id: "fallback-4",
    name: "David Thompson",
    image: "/placeholder.svg?height=200&width=200&text=David+Thompson",
    region: "Leeds",
    specialisms: ["Financial Orders", "Property Division", "Pension Sharing"],
    bio: "Former financial advisor specializing in complex financial arrangements in family court. Helps clients understand financial settlements and pension sharing orders. David has 12 years of experience in financial planning and 5 years as a McKenzie Friend. He specializes in high-value cases involving complex assets, business valuations, and pension arrangements. David has helped clients secure fair financial settlements worth over £50 million collectively, ensuring they understand every aspect of their financial arrangements.",
    experienceLevel: "Senior",
    languages: ["English"],
    verified: true,
    rateInfo: "£60-90 per hour",
    linkedinUrl: "",
    lastVerified: "2024-01-12",
    supportOptions: [
      "Financial Analysis",
      "Document Preparation",
      "Court Support",
      "Asset Valuation",
      "Pension Advice",
    ],
  },
]

async function fetchProfessionals(): Promise<Professional[]> {
  const baseId = "appM8cBf6BabPPibl"
  const tableName = "Verified McKenzie Friend Directory"
  const token = "patjZ3LLDVDFzFa6W.e803da0486075364d6d312ea5397e12071fc4db034c92eb554327e68a4f2efc1"

  try {
    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.error(`Airtable API error: ${response.status} - ${response.statusText}`)
      throw new Error(`Airtable API error: ${response.status}`)
    }

    const data = await response.json()

    return data.records.map((record: AirtableRecord) => ({
      id: record.id,
      name: record.fields.Name || "Unknown",
      image: record.fields["Profile Photo"]?.[0]?.url || "/placeholder.svg?height=200&width=200",
      region: record.fields.Region || "Not specified",
      specialisms: record.fields.Specialisms || [],
      bio: record.fields["Short Bio"] || "No bio available",
      experienceLevel: record.fields["Experience Level"] || "Not specified",
      languages: record.fields["Languages Spoken"] || ["English"],
      verified: record.fields.Verified || false,
      rateInfo: record.fields["Rate Info"] || "Contact for rates",
      linkedinUrl: record.fields["LinkedIn Profile Link"] || "",
      lastVerified: record.fields["Last Verified Date"] || "",
      supportOptions: record.fields["Support Options"] || [],
    }))
  } catch (error) {
    console.error("Error fetching from Airtable:", error)
    console.log("Using fallback data instead")
    // Return fallback data if API fails
    return fallbackProfessionals
  }
}

export default function ProfileDetail() {
  const params = useParams()
  const profileId = params?.id
  const [professional, setProfessional] = useState<Professional | null>(null)
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    async function loadProfessional() {
      try {
        const professionals = await fetchProfessionals()

        // Check if we're using fallback data
        if (professionals.length > 0 && professionals[0].id.startsWith("fallback-")) {
          setUsingFallback(true)
        }

        const found = professionals.find((p) => p.id === profileId)
        setProfessional(found || null)
      } catch (error) {
        console.error("Failed to load professional:", error)
        setUsingFallback(true)
        const found = fallbackProfessionals.find((p) => p.id === profileId)
        setProfessional(found || null)
      } finally {
        setLoading(false)
      }
    }

    loadProfessional()
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 font-merriweather">McKenzie Friend Not Found</h1>
          <Link href="/directory" className="text-[#004A7F] hover:underline font-inter">
            Back to Directory
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E6" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#F5F0E6" }} className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#F7941D] rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg font-merriweather">CSN</span>
              </div>
              <span className="text-2xl font-bold text-[#004A7F] font-merriweather">Court Support Network</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/directory"
                className="text-[#004A7F] hover:text-[#F7941D] transition-colors font-medium font-inter"
              >
                Directory
              </Link>
              <Link
                href="#about"
                className="text-[#004A7F] hover:text-[#F7941D] transition-colors font-medium font-inter"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-[#004A7F] hover:text-[#F7941D] transition-colors font-medium font-inter"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* API Status Notice */}
      {usingFallback && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="container mx-auto px-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700 font-inter">
                  <strong>Demo Mode:</strong> Currently showing sample data. Please check your Airtable API credentials.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Large Header */}
            <Card className="bg-white shadow-lg border border-gray-200">
              <CardContent className="p-10">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0 relative">
                    <Image
                      src={professional.image || "/placeholder.svg"}
                      alt={`${professional.name} profile photo`}
                      width={200}
                      height={200}
                      className="rounded-lg object-cover border-2 border-gray-100"
                    />
                    {professional.verified && (
                      <div className="absolute -top-2 -right-2">
                        <CheckCircle className="h-8 w-8 text-green-600 bg-white rounded-full shadow-sm" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <h1 className="text-4xl font-bold text-gray-900 font-merriweather">{professional.name}</h1>
                      {professional.verified && (
                        <Badge className="bg-green-100 text-green-800 font-inter font-medium">Verified</Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <Badge className="text-base bg-[#004A7F] text-white hover:bg-[#003A6B] font-inter font-medium px-4 py-2">
                        {professional.region}
                      </Badge>
                      {professional.experienceLevel && (
                        <Badge className="text-base bg-gray-100 text-gray-800 font-inter font-medium px-4 py-2">
                          {professional.experienceLevel}
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3 mb-6">
                      {professional.specialisms.map((specialism, index) => (
                        <Badge
                          key={index}
                          className="text-sm px-4 py-2 font-inter font-medium bg-[#F7941D] text-white hover:bg-[#E8851A]"
                        >
                          {specialism}
                        </Badge>
                      ))}
                    </div>

                    {professional.languages.length > 0 && (
                      <div className="text-base text-gray-600 font-inter">
                        <strong>Languages:</strong> {professional.languages.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Biography Section */}
            <Card className="bg-white shadow-lg border border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-3xl font-merriweather text-gray-900">About {professional.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-700 leading-relaxed text-lg font-inter">{professional.bio}</p>
              </CardContent>
            </Card>

            {/* Support Options */}
            {professional.supportOptions.length > 0 && (
              <Card className="bg-white shadow-lg border border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-3xl font-merriweather text-gray-900">Support Options</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-4">
                    {professional.supportOptions.map((option, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="w-2 h-2 bg-[#F7941D] rounded-full mt-3 flex-shrink-0"></div>
                        <span className="text-gray-700 text-lg font-inter">{option}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Back to Directory Breadcrumb */}
            <Link
              href="/directory"
              className="inline-flex items-center text-white hover:text-gray-100 transition-colors font-medium font-inter bg-[#004A7F] hover:bg-[#003A6B] px-6 py-3 rounded-lg shadow-md"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Directory
            </Link>

            {/* Contact CTA */}
            <Card className="sticky top-4 shadow-lg border border-gray-200" style={{ backgroundColor: "#F5F0E6" }}>
              <CardHeader className="pb-4">
                <CardTitle className="text-center text-2xl font-merriweather text-gray-900">Get Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <Button
                  className="w-full bg-[#004A7F] hover:bg-[#003A6B] text-white text-lg py-4 font-inter font-semibold transition-all duration-200"
                  size="lg"
                >
                  Contact {professional.name}
                </Button>

                {professional.linkedinUrl && (
                  <Button
                    variant="outline"
                    className="w-full border-[#004A7F] text-[#004A7F] hover:bg-[#004A7F] hover:text-white font-inter font-semibold bg-transparent"
                    asChild
                  >
                    <Link href={professional.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      LinkedIn Profile
                    </Link>
                  </Button>
                )}

                <Separator className="bg-gray-300" />

                <div className="text-center text-base text-gray-700">
                  <p className="font-semibold mb-2 font-inter">Rate Information</p>
                  <p className="font-inter">{professional.rateInfo}</p>
                </div>

                {professional.lastVerified && (
                  <>
                    <Separator className="bg-gray-300" />
                    <div className="text-center text-base text-gray-700">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Calendar className="h-4 w-4" />
                        <p className="font-semibold font-inter">Last Verified</p>
                      </div>
                      <p className="font-inter">{new Date(professional.lastVerified).toLocaleDateString()}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="shadow-lg border border-gray-200" style={{ backgroundColor: "#F5F0E6" }}>
              <CardHeader className="pb-4">
                <CardTitle className="font-merriweather text-gray-900 text-xl">Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 font-inter">Coverage Area</h4>
                  <p className="text-base text-gray-700 font-inter">{professional.region}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 font-inter">Experience Level</h4>
                  <p className="text-base text-gray-700 font-inter">
                    {professional.experienceLevel || "Not specified"}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 font-inter">Verification Status</h4>
                  <div className="flex items-center gap-2">
                    {professional.verified ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-base text-green-600 font-inter font-medium">
                          Verified McKenzie Friend
                        </span>
                      </>
                    ) : (
                      <span className="text-base text-gray-600 font-inter">Pending verification</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 bg-white border-t border-gray-200 mt-16">
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
