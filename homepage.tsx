"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Homepage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")

  const handleSearch = () => {
    // Navigate to directory with search params
    const params = new URLSearchParams()
    if (searchTerm) params.append('search', searchTerm)
    if (location) params.append('location', location)
    window.location.href = `/directory?${params.toString()}`
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#C4DEC6' }}>
      {/* Outer Container */}
      <div className="min-h-screen flex flex-col max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl">

        {/* Header */}
        <header style={{ backgroundColor: '#1E1E1E' }} className="px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full relative">
                  <div className="absolute inset-1 bg-orange-500 rounded-full"></div>
                </div>
              </div>
              <span className="text-white text-2xl font-bold">Divorce Compass</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-gray-300 font-medium">
                Home
              </Link>
              <Link href="#about" className="text-white hover:text-gray-300 font-medium">
                About
              </Link>
              <Link href="#contact" className="text-white hover:text-gray-300 font-medium">
                Contact
              </Link>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold"
                asChild
              >
                <Link href="/directory">Get Started</Link>
              </Button>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 px-8 py-16" style={{ backgroundColor: '#DDE1D6' }}>
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6">
              Divorce Compass
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
              Guiding you through divorce with clarity and support
            </p>

            {/* Get Started Button */}
            <div className="mb-20">
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 text-xl font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/directory">Get Started</Link>
              </Button>
            </div>
          </div>
        </main>

        {/* Search Section */}
        <section style={{ backgroundColor: '#1E1E1E' }} className="px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              {/* Search Input */}
              <Input
                type="text"
                placeholder="Search for McKenzie Friend"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 max-w-xs px-6 py-4 text-lg rounded-lg border-0 bg-white text-gray-800 placeholder-gray-500"
              />

              {/* Location Input */}
              <Input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 max-w-xs px-6 py-4 text-lg rounded-lg border-0 bg-white text-gray-800 placeholder-gray-500"
              />

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Search
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}