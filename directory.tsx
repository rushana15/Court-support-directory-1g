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
import { mockProfessionals, type Professional } from "@/lib/mock-data"

export default function Directory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [selectedSpecialism, setSelectedSpecialism] = useState("All Specialisms")
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfessionals() {
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 500))
        setProfessionals(mockProfessionals)
      } catch (error) {
        console.error("Failed to load professionals:", error)
        setProfessionals(mockProfessionals)
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
                  className="bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out border border-gray-200 h-full hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
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
            <div className="flex items-center mb-6 md:mb-0">
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
```