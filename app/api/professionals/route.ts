
import { NextResponse } from 'next/server'
import Airtable from 'airtable'
import { mockProfessionals } from '@/lib/mock-data'

export async function GET() {
  try {
    // Get environment variables
    const apiKey = process.env.AIRTABLE_API_KEY
    const baseId = process.env.AIRTABLE_BASE_ID

    console.log('Environment check:', {
      hasApiKey: !!apiKey,
      hasBaseId: !!baseId,
      apiKeyLength: apiKey?.length || 0,
      baseIdLength: baseId?.length || 0
    })

    if (!apiKey || !baseId) {
      console.log('Missing environment variables, returning mock data')
      return NextResponse.json(mockProfessionals)
    }

    // Create Airtable base instance
    const base = new Airtable({
      apiKey: apiKey
    }).base(baseId)

    const records = await base('Replit 1').select({
      view: 'Grid view'
    }).all()

    console.log('Fetched records count:', records.length)

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
    console.log('Returning mock data due to error')
    return NextResponse.json(mockProfessionals)
  }
}
