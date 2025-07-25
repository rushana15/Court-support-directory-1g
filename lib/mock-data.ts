
export interface Professional {
  id: string
  name: string
  image: string
  region: string
  specialisms: string[]
  bio: string
  experienceLevel: string
  languages: string[]
  verified: boolean
  rateInfo: string
  linkedinUrl: string
  lastVerified: string
  supportOptions: string[]
}

export const mockProfessionals: Professional[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    image: "/placeholder.svg?height=200&width=200&text=Sarah+Johnson",
    region: "London",
    specialisms: ["Child Arrangements", "Financial Disputes", "Domestic Violence"],
    bio: "Experienced McKenzie Friend with over 8 years supporting families through court proceedings. Specializes in child arrangement orders and financial disputes.",
    experienceLevel: "Senior",
    languages: ["English", "French"],
    verified: true,
    rateInfo: "£50-80 per hour",
    linkedinUrl: "",
    lastVerified: "2024-01-15",
    supportOptions: ["Court Accompaniment", "Document Preparation", "Case Strategy"],
  },
  {
    id: "2",
    name: "Michael Chen",
    image: "/placeholder.svg?height=200&width=200&text=Michael+Chen",
    region: "Manchester",
    specialisms: ["Property Disputes", "Child Support", "Mediation"],
    bio: "Qualified mediator and McKenzie Friend helping families resolve disputes outside of court when possible. Strong background in property and financial matters.",
    experienceLevel: "Intermediate",
    languages: ["English", "Mandarin"],
    verified: true,
    rateInfo: "£40-60 per hour",
    linkedinUrl: "",
    lastVerified: "2024-01-10",
    supportOptions: ["Mediation Support", "Document Review", "Court Preparation"],
  },
  {
    id: "3",
    name: "Emma Williams",
    image: "/placeholder.svg?height=200&width=200&text=Emma+Williams",
    region: "Birmingham",
    specialisms: ["Domestic Violence", "Emergency Applications", "Child Protection"],
    bio: "Former social worker now providing McKenzie Friend services. Specializes in urgent applications and domestic violence cases with a compassionate approach.",
    experienceLevel: "Senior",
    languages: ["English", "Welsh"],
    verified: true,
    rateInfo: "£45-70 per hour",
    linkedinUrl: "",
    lastVerified: "2024-01-20",
    supportOptions: ["Emergency Support", "Safety Planning", "Court Accompaniment"],
  },
  {
    id: "4",
    name: "David Thompson",
    image: "/placeholder.svg?height=200&width=200&text=David+Thompson",
    region: "Leeds",
    specialisms: ["Financial Orders", "Property Division", "Pension Sharing"],
    bio: "Former financial advisor specializing in complex financial arrangements in family court. Helps clients understand financial settlements and pension sharing orders.",
    experienceLevel: "Senior",
    languages: ["English"],
    verified: true,
    rateInfo: "£60-90 per hour",
    linkedinUrl: "",
    lastVerified: "2024-01-12",
    supportOptions: ["Financial Analysis", "Document Preparation", "Court Support"],
  },
  {
    id: "5",
    name: "Lisa Rodriguez",
    image: "/placeholder.svg?height=200&width=200&text=Lisa+Rodriguez",
    region: "Bristol",
    specialisms: ["Child Custody", "International Family Law", "Relocation Cases"],
    bio: "Bilingual McKenzie Friend with expertise in complex international family law matters. Helps families navigate cross-border custody disputes.",
    experienceLevel: "Intermediate",
    languages: ["English", "Spanish"],
    verified: true,
    rateInfo: "£45-65 per hour",
    linkedinUrl: "",
    lastVerified: "2024-01-18",
    supportOptions: ["Translation Services", "International Documentation", "Court Support"],
  },
  {
    id: "6",
    name: "James Mitchell",
    image: "/placeholder.svg?height=200&width=200&text=James+Mitchell",
    region: "Edinburgh",
    specialisms: ["Scottish Family Law", "Cohabitation Rights", "Civil Partnerships"],
    bio: "Specialist in Scottish family law with particular expertise in cohabitation rights and civil partnership matters. Former paralegal with 10 years experience.",
    experienceLevel: "Senior",
    languages: ["English", "Gaelic"],
    verified: true,
    rateInfo: "£55-85 per hour",
    linkedinUrl: "",
    lastVerified: "2024-01-14",
    supportOptions: ["Scottish Law Expertise", "Document Drafting", "Court Representation"],
  }
]
