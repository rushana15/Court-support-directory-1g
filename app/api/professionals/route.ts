
import { NextResponse } from 'next/server'
import Airtable from 'airtable'

// Configure Airtable on server-side
const apiKey = process.env.AIRTABLE_API_KEY
const baseId = process.env.AIRTABLE_BASE_ID

if (!apiKey || !baseId) {
  console.error('Missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID')
}

const base = new Airtable({
  apiKey: apiKey
}).base(baseId || '')

export async function GET() {
  try {
    if (!apiKey || !baseId) {
      return NextResponse.json(
        { error: 'Airtable configuration missing' },
        { status: 500 }
      )
    }

    const records = await base('Replit 1').select({
      view: 'Grid view'
    }).all()

    const professionals = records.map(record => ({
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

    return NextResponse.json(professionals)
  } catch (error) {
    console.error('Error fetching professionals from Airtable:', error)
    return NextResponse.json(
      { error: 'Failed to fetch professionals' },
      { status: 500 }
    )
  }
}
