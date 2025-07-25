import type React from "react"
import type { Metadata } from "next"
import { Merriweather, Inter, Playfair_Display, Open_Sans } from "next/font/google"
import "./globals.css"

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-opensans",
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
    <html lang="en" className={`${merriweather.variable} ${inter.variable} ${playfairDisplay.variable} ${openSans.variable}`}>
      <body className="font-opensans">{children}</body>
    </html>
  )
}
