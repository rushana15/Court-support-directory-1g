
import { NextResponse } from 'next/server'
import Airtable from 'airtable'

export async function GET() {
  try {
    // Get environment variables
    const apiKey = process.env.AIRTABLE_API_KEY
    const baseId = process.env.AIRTABLE_BASE_ID

    console.log('All environment variables:', Object.keys(process.env).filter(key => key.includes('AIRTABLE')))
    console.log('API Key exists:', !!apiKey)
    console.log('Base ID exists:', !!baseId)
    console.log('API Key length:', apiKey?.length || 0)
    console.log('Base ID length:', baseId?.length || 0)

    if (!apiKey || !baseId) {
      console.error('Missing environment variables:', { 
        hasApiKey: !!apiKey, 
        hasBaseId: !!baseId 
      })
      // Return mock data instead of error
      const { mockProfessionals } = await import('@/lib/mock-data')
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
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch professionals', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
