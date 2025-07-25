interface AirtableRecord {
  id: string
  fields: {
    Name?: string
    "Short Bio"?: string
    Region?: string
    Specialisms?: string[]
    "Experience Level"?: string
    "Languages Spoken"?: string[]
    Verified?: boolean
    "Rate Info"?: string
    "LinkedIn Profile Link"?: string
    "Profile Photo"?: Array<{
      id: string
      url: string
      filename: string
    }>
    "Last Verified Date"?: string
    "Support Options"?: string[]
  }
}

interface Professional {
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

export async function fetchProfessionals(): Promise<Professional[]> {
  const baseId = "appM8cBf6BabPPibl"
  const tableName = "Verified McKenzie Friend Directory"
  const token = "patJ0M501UmeAtHP7.c7ad57fad64612ae0d010b79d7794e60e0ebe25a2335ad9b04639abae8ea6bfb"

  try {
    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`)
    }

    const data = await response.json()

    return data.records.map((record: AirtableRecord) => ({
      id: record.id,
      name: record.fields.Name || "Unknown",
      image: record.fields["Profile Photo"]?.[0]?.url || "/placeholder.svg?height=200&width=200",
      region: record.fields.Region || "Not specified",
      specialisms: record.fields.Specialisms || [],
      bio: record.fields["Short Bio"] || "No bio available",
      experienceLevel: record.fields["Experience Level"] || "Not specified",
      languages: record.fields["Languages Spoken"] || ["English"],
      verified: record.fields.Verified || false,
      rateInfo: record.fields["Rate Info"] || "Contact for rates",
      linkedinUrl: record.fields["LinkedIn Profile Link"] || "",
      lastVerified: record.fields["Last Verified Date"] || "",
      supportOptions: record.fields["Support Options"] || [],
    }))
  } catch (error) {
    console.error("Error fetching from Airtable:", error)
    // Return fallback data if API fails
    return []
  }
}
