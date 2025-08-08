import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Header */}
      <header className="bg-header-footer border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/compass-logo.svg"
                alt="Divorce Compass Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-3xl font-bold text-white font-playfair tracking-wide">Divorce Compass</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/about"
                className="text-white hover:text-gray-300 hover:font-semibold transition-all font-medium font-inter"
              >
                About
              </Link>
              <Link
                href="/#how-it-works"
                className="text-white hover:text-gray-300 hover:font-semibold transition-all font-medium font-inter"
              >
                How it Works
              </Link>
              <Link
                href="/#contact"
                className="text-white hover:text-gray-300 hover:font-semibold transition-all font-medium font-inter"
              >
                Contact
              </Link>
              <Link
                href="/apply"
                className="text-white hover:text-gray-300 hover:font-semibold transition-all font-medium font-inter"
              >
                For Advisors
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 font-playfair text-main-text text-center">
            About Divorce Compass
          </h1>

          {/* What We Do Section */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 font-playfair text-main-text">What We Do</h2>
            <p className="text-lg font-inter leading-relaxed text-main-text">
              We connect you with vetted, trustworthy professionals who can guide you through divorce, separation, or family disputes. Whether you need help preparing for court, navigating negotiations, or managing co-parenting challenges, you'll find experienced, verified people here — ready to support you.
            </p>
          </div>

          {/* Why It Matters Section */}
          <div className="bg-gray-100 rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 font-playfair text-main-text">Why It Matters</h2>
            <p className="text-lg font-inter leading-relaxed text-main-text">
              Family court issues are rarely just about the law. They're about disputes, conflict, and the personal, practical challenges that come with them. Our professionals understand this. While we cannot give legal advice, most family law cases involve far more strategy, planning, and communication than pure legal argument.
            </p>
          </div>

          {/* Who You'll Find Here Section */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 font-playfair text-main-text">Who You'll Find Here</h2>
            <p className="text-lg font-inter leading-relaxed text-main-text">
              Some of our professionals have legal backgrounds, some have social work experience, some are qualified McKenzie Friends, and others have first-hand experience of the family court process. Every one of them has been checked for professionalism, experience, and integrity.
            </p>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-gray-100 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 font-playfair text-main-text">Why Choose Us</h2>
            <p className="text-lg font-inter leading-relaxed text-main-text">
              Finding the right support can be overwhelming. Posting in Facebook groups, Reddit threads, or other forums can leave you more confused — and you never really know who's on the other side. We've done the work for you. While no one can guarantee your outcome, we can guarantee you'll be connected with a real person who is knowledgeable, genuine, and committed to helping.
            </p>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-[#f7f7f7] rounded-2xl p-12">
            <p className="text-2xl font-bold mb-8 font-playfair text-main-text">
              Ready to find the right support?
            </p>
            <Link
              href="/directory"
              className="inline-flex items-center rounded-full bg-[#E76F51] hover:bg-[#D14A3E] px-8 py-4 text-lg font-semibold text-white shadow-sm transition font-inter"
            >
              Browse the Directory
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-header-footer border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <Image
                src="/compass-logo.svg"
                alt="Divorce Compass Logo"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="text-xl font-bold text-white font-playfair">Divorce Compass</span>
            </div>

            <div className="flex items-center space-x-8">
              <div className="text-sm text-gray-300 font-inter">
                © {new Date().getFullYear()} Divorce Compass. All rights reserved.
              </div>
              <Link
                href="/apply"
                className="text-white hover:text-gray-300 font-medium transition-colors underline underline-offset-2 font-inter"
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