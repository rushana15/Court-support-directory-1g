
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface ProfessionalContactFormProps {
  displayName: string
  slug: string
  isAcceptingInquiries: boolean
}

export default function ProfessionalContactForm({
  displayName,
  slug,
  isAcceptingInquiries,
}: ProfessionalContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch(`/api/contact/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  if (!isAcceptingInquiries) {
    return (
      <Card className="rounded-xl border border-gray-200 bg-white/80 shadow-sm">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-main-text mb-4 font-playfair">
              Contact {displayName}
            </h3>
            <p className="text-muted-text mb-6 font-inter">
              This professional isn't accepting new inquiries at the moment.
            </p>
            <Button
              asChild
              className="bg-cta-coral hover:bg-cta-coral-hover text-white px-6 py-2 font-inter font-semibold rounded-full transition-all duration-300"
            >
              <Link href="/directory">Browse Directory</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="rounded-xl border border-gray-200 bg-white/80 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-main-text font-playfair">
          Contact {displayName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {submitStatus === "success" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-inter text-sm">
              Your message has been sent successfully! {displayName} will get back to you soon.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-inter text-sm">
              There was an error sending your message. Please try again.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`font-inter bg-input-bg ${errors.name ? "border-red-500" : ""}`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 font-inter">{errors.name}</p>
            )}
          </div>

          <div>
            <Input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`font-inter bg-input-bg ${errors.email ? "border-red-500" : ""}`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 font-inter">{errors.email}</p>
            )}
          </div>

          <div>
            <Textarea
              placeholder="Your message..."
              rows={4}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className={`font-inter bg-input-bg resize-none ${errors.message ? "border-red-500" : ""}`}
              required
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1 font-inter">{errors.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cta-coral hover:bg-cta-coral-hover text-white px-6 py-3 font-inter font-semibold rounded-full transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>

        <p className="text-xs text-muted-text text-center font-inter mt-2">
          Your message goes straight to this professional. Their email stays private.
        </p>
      </CardContent>
    </Card>
  )
}
