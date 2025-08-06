import type React from "react"
import type { Metadata } from "next"
import { Merriweather, Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Court Support Network",
  description: "Vetted professionals for family court support, no solicitor needed",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${merriweather.variable} ${inter.variable}`}>
      <body className={`${inter.variable} ${merriweather.variable} ${playfair.variable} antialiased`}>{children}</body>
    </html>
  )
}