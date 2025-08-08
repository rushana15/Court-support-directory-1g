
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
          <h1 className="text-4xl md:text-5xl font-bold mb-8 font-playfair text-main-text text-center">
            About Divorce Compass
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <div className="text-xl mb-8 font-inter leading-relaxed text-main-text">
              <p className="mb-6">
                Divorce Compass is the UK's first fully vetted directory of divorce support professionals. 
                We connect people going through divorce and separation with experienced, trustworthy advisors 
                who can provide the guidance and support they need during this challenging time.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 font-playfair text-main-text">Our Mission</h2>
            <p className="text-lg mb-6 font-inter leading-relaxed text-main-text">
              Navigating divorce and family court proceedings can be overwhelming, expensive, and emotionally draining. 
              Our mission is to make quality support accessible by connecting you directly with vetted professionals 
              who have the experience and expertise to help you through this difficult journey.
            </p>

            <h2 className="text-3xl font-bold mb-6 font-playfair text-main-text">What Makes Us Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#f7f7f7] rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 font-playfair text-main-text">Fully Vetted Professionals</h3>
                <p className="text-main-text font-inter leading-relaxed">
                  Every professional in our directory has been personally interviewed, reference-checked, 
                  and verified for relevant experience. No exceptions.
                </p>
              </div>
              <div className="bg-[#f7f7f7] rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 font-playfair text-main-text">Direct Communication</h3>
                <p className="text-main-text font-inter leading-relaxed">
                  Your inquiries go straight to the professional you choose — no middlemen, 
                  no gatekeepers, faster responses.
                </p>
              </div>
              <div className="bg-[#f7f7f7] rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 font-playfair text-main-text">Transparent Pricing</h3>
                <p className="text-main-text font-inter leading-relaxed">
                  We use a membership model, not commission-based fees. This keeps costs 
                  transparent and in your control.
                </p>
              </div>
              <div className="bg-[#f7f7f7] rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 font-playfair text-main-text">Easy to Use</h3>
                <p className="text-main-text font-inter leading-relaxed">
                  Simple search filters help you find the right support quickly based on 
                  expertise, location, and experience level.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 font-playfair text-main-text">Who We Help</h2>
            <p className="text-lg mb-6 font-inter leading-relaxed text-main-text">
              Whether you're dealing with child arrangements, financial disputes, court representation, 
              or simply need guidance on your legal options, our directory includes professionals 
              with experience across all areas of family law and divorce support.
            </p>

            <h2 className="text-3xl font-bold mb-6 font-playfair text-main-text">Ready to Find Support?</h2>
            <p className="text-lg mb-8 font-inter leading-relaxed text-main-text">
              Browse our vetted directory to find experienced professionals who can help guide you 
              through your divorce or family law matter with confidence and clarity.
            </p>

            <div className="text-center">
              <Link
                href="/directory"
                className="inline-flex items-center rounded-full bg-[#E76F51] hover:bg-[#D14A3E] px-8 py-4 text-lg font-semibold text-white shadow-sm transition font-inter"
              >
                Browse the Directory
              </Link>
            </div>
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
