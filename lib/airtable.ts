
import Airtable from 'airtable'

// Configure Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID || '')

// Define the Professional type based on your Airtable fields
export interface Professional {
  id: string
  "Name": string
  "Short Bio": string
  "Region": string
  "Specialisms": string[]
  "Experience Level": string
  "Languages Spoken": string[]
  "Verified": boolean
  "Rate Info": string
  "LinkedIn Profile Link": string
  "Profile Photo": string
  "Last Verified Date": string
}

export async function fetchProfessionals(): Promise<Professional[]> {
  try {
    const records = await base('Replit 1').select({
      view: 'Grid view' // or whatever your default view is called
    }).all()

    return records.map(record => ({
      id: record.id,
      "Name": record.fields["Name"] as string || "",
      "Short Bio": record.fields["Short Bio"] as string || "",
      "Region": record.fields["Region"] as string || "",
      "Specialisms": record.fields["Specialisms"] as string[] || [],
      "Experience Level": record.fields["Experience Level"] as string || "",
      "Languages Spoken": record.fields["Languages Spoken"] 
        ? (record.fields["Languages Spoken"] as string).split(',').map(lang => lang.trim())
        : [],
      "Verified": record.fields["Verified"] as boolean || false,
      "Rate Info": record.fields["Rate Info"] as string || "",
      "LinkedIn Profile Link": record.fields["LinkedIn Profile Link"] as string || "",
      "Profile Photo": record.fields["Profile Photo"] 
        ? (record.fields["Profile Photo"] as any)?.[0]?.url || "/placeholder.svg"
        : "/placeholder.svg",
      "Last Verified Date": record.fields["Last Verified Date"] as string || ""
    }))
  } catch (error) {
    console.error('Error fetching professionals from Airtable:', error)
    return []
  }
}
