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
import { fetchProfessionals, type Professional } from "@/lib/airtable"

export default function Directory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [selectedSpecialism, setSelectedSpecialism] = useState("All Specialisms")
  const [selectedExperience, setSelectedExperience] = useState("All Levels")
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfessionals() {
      try {
        const data = await fetchProfessionals()
        setProfessionals(data)
      } catch (error) {
        console.error("Failed to load professionals:", error)
        setProfessionals([])
      } finally {
        setLoading(false)
      }
    }

    loadProfessionals()
  }, [])

  const regions = Array.from(new Set(professionals.map(p => p["Region"]))).filter(Boolean)
  const specialisms = Array.from(new Set(professionals.flatMap(p => Array.isArray(p["Specialisms"]) ? p["Specialisms"] : []))).filter(Boolean)

  const filteredProfessionals = professionals.filter(professional => {
    const matchesSearch = professional["Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional["Short Bio"].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (Array.isArray(professional["Specialisms"]) && professional["Specialisms"].some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())))

    const matchesRegion = selectedRegion === "All Regions" || professional["Region"] === selectedRegion
    const matchesSpecialism = selectedSpecialism === "All Specialisms" || (Array.isArray(professional["Specialisms"]) && professional["Specialisms"].includes(selectedSpecialism))
    const matchesExperience = selectedExperience === "All Levels" || professional["Experience Level"] === selectedExperience
    const matchesVerified = !showVerifiedOnly || professional["Verified"]

    return matchesSearch && matchesRegion && matchesSpecialism && matchesExperience && matchesVerified
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-inter">Loading professionals...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-beige">
      {/* Header */}
      <header className="bg-primary-green border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-3xl font-bold text-white font-playfair tracking-wide">Court Support Network</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="#about"
                className="text-warm-beige hover:text-white hover:font-semibold transition-all font-medium font-inter"
              >
                About
              </Link>
              <Link
                href="#how-it-works"
                className="text-warm-beige hover:text-white hover:font-semibold transition-all font-medium font-inter"
              >
                How it Works
              </Link>
              <Link
                href="#contact"
                className="text-warm-beige hover:text-white hover:font-semibold transition-all font-medium font-inter"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-soft-white py-16 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-primary-green mb-6 font-playfair">McKenzie Friend Directory</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-inter leading-relaxed">
              Find verified McKenzie Friends in your area - {professionals.length} professionals available to support
              you
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-soft-white rounded-lg shadow-lg border border-gray-200 p-8">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search by name or expertise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-3 border-gray-300 focus:border-primary-green focus:ring-primary-green font-inter"
                  />
                </div>

                {/* Region Filter */}
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="py-3 font-inter border-gray-300 focus:border-primary-green">
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
                  <SelectTrigger className="py-3 font-inter border-gray-300 focus:border-primary-green">
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
      <section className="py-16 bg-warm-beige">
        <div className="container mx-auto px-4">
          {filteredProfessionals.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-6 font-inter">No McKenzie Friends found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedRegion("All Regions")
                  setSelectedSpecialism("All Specialisms")
                  setSelectedExperience("All Levels")
                  setShowVerifiedOnly(false)
                }}
                className="bg-primary-green hover:bg-primary-green/90 text-white font-inter"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProfessionals.map((professional) => (
                <Card
                  key={professional.id}
                  className="bg-soft-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out border border-gray-200 h-full hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
                >
                  <CardContent className="p-6">
                    {/* Profile Photo */}
                    <div className="text-center mb-6 relative">
                      <Image
                        src={professional["Profile Photo"] || "/placeholder.svg"}
                        alt={`${professional["Name"]} profile photo`}
                        width={100}
                        height={100}
                        className="rounded-full mx-auto object-cover border-2 border-gray-100"
                      />
                      {professional["Verified"] && (
                        <div className="absolute -top-2 -right-2">
                          <CheckCircle className="h-6 w-6 text-green-600 bg-white rounded-full shadow-sm" />
                        </div>
                      )}
                    </div>

                    {/* Name and Region */}
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-primary-green mb-2 font-playfair">{professional["Name"]}</h3>
                      <p className="text-base text-gray-600 font-inter">{professional["Region"]}</p>
                      {professional["Experience Level"] && (
                        <p className="text-sm text-gray-500 font-inter">{professional["Experience Level"]}</p>
                      )}
                    </div>

                    {/* Specialisms */}
                    {professional["Specialisms"] && Array.isArray(professional["Specialisms"]) && professional["Specialisms"].length > 0 && (
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {professional["Specialisms"].slice(0, 3).map((specialism: string, index: number) => (
                          <Badge key={index} className="bg-deep-taupe text-white hover:bg-deep-taupe/90 transition-colors text-xs font-inter font-medium rounded-full">
                            {specialism}
                          </Badge>
                        ))}
                        {professional["Specialisms"].length > 3 && (
                          <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors text-xs font-inter">
                            +{professional["Specialisms"].length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Bio */}
                    <p className="text-sm text-gray-700 text-center mb-6 line-clamp-3 font-inter leading-relaxed">
                      {professional["Short Bio"]}
                    </p>

                    {/* Languages */}
                    {professional["Languages Spoken"] && professional["Languages Spoken"].length > 0 && (
                      <div className="text-center mb-6">
                        <p className="text-xs text-gray-500 font-inter">
                          Languages: {Array.isArray(professional["Languages Spoken"]) ? professional["Languages Spoken"].join(", ") : professional["Languages Spoken"] || "Not specified"}
                        </p>
                      </div>
                    )}

                    {/* Rate Info */}
                    {(professional["Rate Info"] || professional["Fixed Fee Text"]) && (
                      <div className="text-center mb-6 space-y-1">
                        {professional["Rate Info"] && (
                          <p className="text-sm text-gray-600 font-inter">{professional["Rate Info"]}</p>
                        )}
                        {professional["Fixed Fee Text"] && (
                          <p className="text-xs text-green-700 font-inter">{professional["Fixed Fee Text"]}</p>
                        )}
                      </div>
                    )}


                    {/* View Profile Button */}
                    <div className="text-center">
                      <Button
                        className="bg-primary-green hover:bg-primary-green/90 text-white w-full font-inter font-semibold"
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
      <footer className="py-16 bg-soft-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
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