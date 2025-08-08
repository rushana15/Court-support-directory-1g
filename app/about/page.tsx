
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Users, Shield, Zap, ArrowRight } from "lucide-react"

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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-gray-100 py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-playfair text-main-text leading-tight">
              About Divorce Compass
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              The only fully vetted directory connecting you with trusted divorce support professionals across the UK
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#E76F51] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-playfair text-main-text mb-2">100% Vetted</h3>
              <p className="text-gray-600 font-inter">Every professional is personally interviewed and reference-checked</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#E76F51] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-playfair text-main-text mb-2">Direct Connection</h3>
              <p className="text-gray-600 font-inter">No middlemen - connect directly with the right professional</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#E76F51] rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-playfair text-main-text mb-2">Fast Results</h3>
              <p className="text-gray-600 font-inter">Find the right support quickly with our easy search filters</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl">
          
          {/* What We Do Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#E76F51] rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold font-playfair text-main-text">What We Do</h2>
              </div>
              <p className="text-lg font-inter leading-relaxed text-gray-700 mb-6">
                We connect you with vetted, trustworthy professionals who can guide you through divorce, separation, or family disputes. Whether you need help preparing for court, navigating negotiations, or managing co-parenting challenges, you'll find experienced, verified people here — ready to support you.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#E76F51]" />
                  <span className="font-inter text-gray-700">Court preparation & representation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#E76F51]" />
                  <span className="font-inter text-gray-700">Negotiation support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#E76F51]" />
                  <span className="font-inter text-gray-700">Co-parenting guidance</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#E76F51] to-[#D14A3E] rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold font-playfair mb-4">Your Support Network</h3>
              <p className="font-inter leading-relaxed mb-6">
                Family disputes are complex. Our professionals understand the emotional, practical, and strategic challenges you face.
              </p>
              <Link
                href="/directory"
                className="inline-flex items-center gap-2 bg-white text-[#E76F51] px-6 py-3 rounded-full font-semibold font-inter hover:bg-gray-100 transition-colors"
              >
                Browse Professionals
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Why It Matters Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1 bg-gray-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold font-playfair mb-4 text-main-text">The Reality of Family Court</h3>
              <p className="font-inter leading-relaxed text-gray-700 mb-4">
                Most family law cases involve far more strategy, planning, and communication than pure legal argument.
              </p>
              <p className="font-inter leading-relaxed text-gray-700">
                Our professionals understand that success often comes from emotional intelligence and practical guidance, not just legal knowledge.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#E76F51] rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold font-playfair text-main-text">Why It Matters</h2>
              </div>
              <p className="text-lg font-inter leading-relaxed text-gray-700 mb-6">
                Family court issues are rarely just about the law. They're about disputes, conflict, and the personal, practical challenges that come with them. Our professionals understand this.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <p className="font-inter text-gray-700 italic">
                  "While we cannot give legal advice, our experience shows that most cases need strategic thinking and emotional support as much as legal knowledge."
                </p>
              </div>
            </div>
          </div>

          {/* Who You'll Find Here Section */}
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-12 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-playfair text-main-text mb-4">Who You'll Find Here</h2>
              <p className="text-xl font-inter text-gray-600 max-w-3xl mx-auto">
                A diverse network of professionals, all with one thing in common: proven experience helping people through family court challenges
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h3 className="font-bold font-playfair text-main-text mb-2">Legal Backgrounds</h3>
                <p className="text-sm font-inter text-gray-600">Former solicitors and legal professionals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-bold font-playfair text-main-text mb-2">Social Work</h3>
                <p className="text-sm font-inter text-gray-600">Trained in family support and mediation</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="font-bold font-playfair text-main-text mb-2">Qualified McKenzie Friends</h3>
                <p className="text-sm font-inter text-gray-600">Certified court support specialists</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💪</span>
                </div>
                <h3 className="font-bold font-playfair text-main-text mb-2">Personal Experience</h3>
                <p className="text-sm font-inter text-gray-600">Successfully navigated their own cases</p>
              </div>
            </div>
            
            <div className="text-center mt-8 bg-white rounded-2xl p-6">
              <p className="font-inter text-gray-700">
                <strong>Every professional</strong> has been checked for professionalism, experience, and integrity.
              </p>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-gradient-to-br from-[#E76F51] to-[#D14A3E] rounded-3xl p-12 text-white mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-playfair mb-4">Why Choose Divorce Compass</h2>
              <p className="text-xl font-inter opacity-90 max-w-3xl mx-auto">
                We've done the hard work of vetting professionals so you don't have to guess who to trust
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold font-playfair mb-3">No More Guesswork</h3>
                <p className="font-inter leading-relaxed">
                  Posting in Facebook groups or Reddit threads can leave you more confused. You never really know who's on the other side or what their agenda is.
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold font-playfair mb-3">Real People, Real Experience</h3>
                <p className="font-inter leading-relaxed">
                  While no one can guarantee your outcome, we guarantee you'll be connected with knowledgeable, genuine people committed to helping.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-3xl p-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair text-main-text">
              Ready to find the right support?
            </h2>
            <p className="text-xl text-gray-600 font-inter mb-8 max-w-2xl mx-auto">
              Browse our vetted directory of professionals and connect directly with someone who can help with your specific situation.
            </p>
            <Link
              href="/directory"
              className="inline-flex items-center gap-3 rounded-full bg-[#E76F51] hover:bg-[#D14A3E] px-10 py-5 text-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all font-inter"
            >
              Browse the Directory
              <ArrowRight className="w-6 h-6" />
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
