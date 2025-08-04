"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { mockProfessionals, type Professional } from "@/lib/mock-data"
import HeroSection from "@/components/hero-section"

// Assume fetchProfessionals is defined elsewhere and fetches data from Airtable
// For demonstration purposes, let's mock it here. In a real app, this would be an API call.
async function fetchProfessionals(): Promise<Professional[]> {
  // Replace this with your actual Airtable fetching logic
  // Example:
  // const response = await fetch('/api/professionals');
  // const data = await response.json();
  // return data;
  console.warn("Using mock fetchProfessionals. Replace with actual API call.");

  // Mocking the structure that the error implies, with correct casing and potential undefined specialisms
  const mockAirtableData: any[] = [
    {
      "id": "1",
      "Name": "Alice Wonderland",
      "Verified": true,
      "Specialisms": ["Family Law Mediation", "Child Custody Support"],
      "region": "London",
      "experienceLevel": "Senior",
      "rateInfo": "£50/hour",
      "image": "/alice.jpg"
    },
    {
      "id": "2",
      "Name": "Bob The Builder",
      "Verified": false,
      "Specialisms": ["Property Disputes", "Landlord Advice"],
      "region": "Manchester",
      "experienceLevel": "Mid-Level",
      "rateInfo": "£40/hour",
      "image": "/bob.jpg"
    },
    {
      "id": "3",
      "Name": "Charlie Chaplin",
      "Verified": true,
      "Specialisms": ["Divorce Guidance", "Financial Settlements"],
      "region": "Birmingham",
      "experienceLevel": "Junior",
      "rateInfo": "£35/hour",
      "image": "/charlie.jpg"
    },
    {
      "id": "4",
      "Name": "Diana Prince",
      "Verified": true,
      "Specialisms": ["Domestic Violence Support", "Legal Aid Assistance"],
      "region": "Bristol",
      "experienceLevel": "Senior",
      "rateInfo": "£60/hour",
      "image": "/diana.jpg"
    },
    {
      "id": "5",
      "Name": "Ethan Hunt",
      "Verified": false,
      "Specialisms": ["Immigration Law", "Visa Applications"],
      "region": "Online",
      "experienceLevel": "Expert",
      "rateInfo": "£75/hour",
      "image": "/ethan.jpg"
    },
    {
      "id": "6",
      "Name": "Fiona Shrek",
      "Verified": true,
      "Specialisms": ["Mediation", "Collaborative Law"],
      "region": "Glasgow",
      "experienceLevel": "Mid-Level",
      "rateInfo": "£45/hour",
      "image": "/fiona.jpg"
    },
    {
      "id": "7",
      "Name": "George Jetson",
      "Verified": false,
      "Specialisms": null, // Example of potentially missing specialisms
      "region": "New York",
      "experienceLevel": "Senior",
      "rateInfo": "$100/hour",
      "image": "/george.jpg"
    }
  ];

  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));

  // Map to the Professional type, ensuring correct property access
  const professionals: Professional[] = mockAirtableData.map((item: any) => ({
    id: item.id,
    name: item.Name,
    verified: item.Verified,
    specialisms: item["Specialisms"] || [], // Handle null or undefined gracefully
    region: item.region,
    experienceLevel: item.experienceLevel,
    rateInfo: item.rateInfo,
    image: item.image
  }));

  return professionals;
}


export default function Homepage() {
  const [featuredProfessionals, setFeaturedProfessionals] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFeaturedProfessionals() {
      try {
        const data = await fetchProfessionals()
        // Show first 3 verified professionals
        const featured = data.filter(p => p.verified).slice(0, 3) // Corrected to use 'verified' property
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header style={{ backgroundColor: "#002F5F" }} className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-[#F3E9DC] font-merriweather tracking-wide">Court Support Network</span>
            </div>
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

      {/* Hero Section */}
      <HeroSection />

      {/* Profile Cards Section */}
      <section className="py-20" style={{ backgroundColor: "#F5F0E6" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-merriweather">Featured McKenzie Friends</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
              Meet some of our verified McKenzie Friends ready to support you through your family court journey with
              expertise and compassion
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004A7F] mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 font-inter">Loading featured professionals...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {featuredProfessionals.map((professional) => (
                <Card
                  key={professional.id}
                  className="bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out border border-gray-200 h-full hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Profile Photo and Verification */}
                    <div className="text-center mb-4 relative">
                      <Image
                        src={professional.image || "/placeholder.svg"}
                        alt={`${professional.name} profile photo`}
                        width={80}
                        height={80}
                        className="rounded-full mx-auto object-cover border-2 border-gray-100"
                      />
                      {professional.verified && (
                        <div className="absolute top-0 right-1/2 transform translate-x-8 -translate-y-1">
                          <CheckCircle className="h-5 w-5 text-green-600 bg-white rounded-full" />
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center font-merriweather">{professional.name}</h3>

                    {/* Professional Details */}
                    <div className="space-y-3 mb-6 flex-grow">
                      {/* Location */}
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-sm text-gray-600 font-inter">{professional.region}</span>
                      </div>

                      {/* Experience Level */}
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-sm text-gray-600 font-inter">{professional.experienceLevel || "Not specified"}</span>
                      </div>

                      {/* Rate */}
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-sm text-gray-600 font-inter">{professional.rateInfo}</span>
                      </div>
                    </div>

                    {/* Specialisms - Smaller tags */}
                    <div className="flex flex-wrap gap-1 justify-center mb-6">
                      {/* Accessing specialisms using dot notation and ensuring it's an array */}
                      {(professional.specialisms || []).slice(0, 3).map((specialism, index) => (
                        <Badge
                          key={index}
                          className="bg-[#F7941D] text-white text-xs px-2 py-1 font-inter font-medium"
                        >
                          {specialism}
                        </Badge>
                      ))}
                    </div>

                    {/* View Profile Button */}
                    <div className="mt-auto">
                      <Button
                        className="bg-[#004A7F] hover:bg-[#003A6B] text-white w-full py-2.5 font-inter font-semibold"
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