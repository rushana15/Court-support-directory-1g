"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
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
    bio: "Experienced McKenzie Friend with over 8 years supporting families through court proceedings. Specializes in child arrangement orders and financial disputes.",
    experienceLevel: "Senior",
    languages: ["English", "French"],
    verified: true,
    rateInfo: "£50-80 per hour",
    linkedinUrl: "",
    lastVerified: "2024-01-15",
    supportOptions: ["Court Accompaniment", "Document Preparation", "Case Strategy"],
  },
  {
    id: "fallback-2",
    name: "Michael Chen",
    image: "/placeholder.svg?height=200&width=200&text=Michael+Chen",
    region: "Manchester",
    specialisms: ["Property Disputes", "Child Support", "Mediation"],
    bio: "Qualified mediator and McKenzie Friend helping families resolve disputes outside of court when possible. Strong background in property and financial matters.",
    experienceLevel: "Intermediate",
    languages: ["English", "Mandarin"],
    verified: true,
    rateInfo: "£40-60 per hour",
    linkedinUrl: "",
    lastVerified: "2024-01-10",
    supportOptions: ["Mediation Support", "Document Review", "Court Preparation"],
  },
  {
    id: "fallback-3",
    name: "Emma Williams",
    image: "/placeholder.svg?height=200&width=200&text=Emma+Williams",
    region: "Birmingham",
    specialisms: ["Domestic Violence", "Emergency Applications", "Child Protection"],
    bio: "Former social worker now providing McKenzie Friend services. Specializes in urgent applications and domestic violence cases with a compassionate approach.",
    experienceLevel: "Senior",
    languages: ["English", "Welsh"],
    verified: true,
    rateInfo: "£45-70 per hour",
    linkedinUrl: "",
    lastVerified: "2024-01-20",
    supportOptions: ["Emergency Support", "Safety Planning", "Court Accompaniment"],
  },
  {
    id: "fallback-4",
    name: "David Thompson",
    image: "/placeholder.svg?height=200&width=200&text=David+Thompson",
    region: "Leeds",
    specialisms: ["Financial Orders", "Property Division", "Pension Sharing"],
    bio: "Former financial advisor specializing in complex financial arrangements in family court. Helps clients understand financial settlements and pension sharing orders.",
    experienceLevel: "Senior",
    languages: ["English"],
    verified: true,
    rateInfo: "£60-90 per hour",
    linkedinUrl: "",
    lastVerified: "2024-01-12",
    supportOptions: ["Financial Analysis", "Document Preparation", "Court Support"],
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

export default function Directory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [selectedSpecialism, setSelectedSpecialism] = useState("All Specialisms")
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    async function loadProfessionals() {
      try {
        const data = await fetchProfessionals()

        // Check if we're using fallback data
        if (data.length > 0 && data[0].id.startsWith("fallback-")) {
          setUsingFallback(true)
        }

        setProfessionals(data)
      } catch (error) {
        console.error("Failed to load professionals:", error)
        setUsingFallback(true)
        setProfessionals(fallbackProfessionals)
      } finally {
        setLoading(false)
      }
    }

    loadProfessionals()
  }, [])

  const regions = Array.from(new Set(professionals.map((p) => p.region))).filter(Boolean)
  const specialisms = Array.from(new Set(professionals.flatMap((p) => p.specialisms))).filter(Boolean)

  const filteredProfessionals = professionals.filter((professional) => {
    const matchesSearch =
      professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.specialisms.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesRegion = selectedRegion === "All Regions" || professional.region === selectedRegion
    const matchesSpecialism =
      selectedSpecialism === "All Specialisms" || professional.specialisms.includes(selectedSpecialism)

    return matchesSearch && matchesRegion && matchesSpecialism
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004A7F] mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-inter">Loading professionals...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
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
                href="#about"
                className="text-[#004A7F] hover:text-[#F7941D] transition-colors font-medium font-inter"
              >
                About
              </Link>
              <Link
                href="#how-it-works"
                className="text-[#004A7F] hover:text-[#F7941D] transition-colors font-medium font-inter"
              >
                How it Works
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

      {/* Page Header */}
      <section style={{ backgroundColor: "#F5F0E6" }} className="py-16 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 font-merriweather">McKenzie Friend Directory</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
              Find verified McKenzie Friends in your area - {professionals.length} professionals available to support
              you
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search by name or expertise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-3 border-gray-300 focus:border-[#004A7F] focus:ring-[#004A7F] font-inter"
                  />
                </div>

                {/* Region Filter */}
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="py-3 border-gray-300 focus:border-[#004A7F] focus:ring-[#004A7F] font-inter">
                    <SelectValue placeholder="Select Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Regions">All Regions</SelectItem>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Specialism Filter */}
                <Select value={selectedSpecialism} onValueChange={setSelectedSpecialism}>
                  <SelectTrigger className="py-3 border-gray-300 focus:border-[#004A7F] focus:ring-[#004A7F] font-inter">
                    <SelectValue placeholder="Select Specialism" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Specialisms">All Specialisms</SelectItem>
                    {specialisms.map((specialism) => (
                      <SelectItem key={specialism} value={specialism}>
                        {specialism}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Results Count */}
              <div className="mt-6 text-base text-gray-600 font-inter">
                Showing {filteredProfessionals.length} of {professionals.length} McKenzie Friends
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredProfessionals.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-6 font-inter">No McKenzie Friends found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedRegion("All Regions")
                  setSelectedSpecialism("All Specialisms")
                }}
                className="bg-[#004A7F] hover:bg-[#003A6B] text-white font-inter"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfessionals.map((professional) => (
                <Card
                  key={professional.id}
                  className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                >
                  <CardContent className="p-6">
                    {/* Profile Photo */}
                    <div className="text-center mb-6 relative">
                      <Image
                        src={professional.image || "/placeholder.svg"}
                        alt={`${professional.name} profile photo`}
                        width={100}
                        height={100}
                        className="rounded-lg mx-auto object-cover border-2 border-gray-100"
                      />
                      {professional.verified && (
                        <div className="absolute -top-2 -right-2">
                          <CheckCircle className="h-6 w-6 text-green-600 bg-white rounded-full shadow-sm" />
                        </div>
                      )}
                    </div>

                    {/* Name and Region */}
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 font-merriweather">{professional.name}</h3>
                      <p className="text-base text-gray-500 font-inter">{professional.region}</p>
                      {professional.experienceLevel && (
                        <p className="text-sm text-gray-400 font-inter">{professional.experienceLevel}</p>
                      )}
                    </div>

                    {/* Specialisms */}
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {professional.specialisms.slice(0, 3).map((specialism, index) => (
                        <Badge
                          key={index}
                          className="bg-[#F7941D] text-white hover:bg-[#E8851A] transition-colors text-xs font-inter font-medium"
                        >
                          {specialism}
                        </Badge>
                      ))}
                      {professional.specialisms.length > 3 && (
                        <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors text-xs font-inter">
                          +{professional.specialisms.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-gray-600 text-center mb-6 line-clamp-3 font-inter leading-relaxed">
                      {professional.bio}
                    </p>

                    {/* Languages */}
                    {professional.languages.length > 0 && (
                      <div className="text-center mb-6">
                        <p className="text-xs text-gray-500 font-inter">
                          Languages: {professional.languages.join(", ")}
                        </p>
                      </div>
                    )}

                    {/* View Profile Button */}
                    <div className="text-center">
                      <Button
                        className="bg-[#004A7F] hover:bg-[#003A6B] text-white w-full font-inter font-semibold"
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
