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

    const records = await base('Table 1').select({
      view: 'Grid view'
    }).all()

    console.log('Fetched records count:', records.length)

    // Debug: Log the first record's raw fields
    if (records.length > 0) {
      const firstRecord = records[0]
      console.log('First record ID:', firstRecord.id)
      console.log('First record fields:', firstRecord.fields)
      console.log('Available field names:', Object.keys(firstRecord.fields))
    }

    const professionals = records.map(record => ({
      id: record.id,
      "Name": record.get('Name') as string || '',
      "Short Bio": record.get('Short Bio') as string || '',
      "Region": record.get('Region') as string || '',
      "Specialisms": (record.get('Specialisms') as string[]) || [],
      "Experience Level": record.get('Experience Level') as string || '',
      "Languages Spoken": (record.get('Languages Spoken') as string[]) || [],
      "Verified": record.get('Verified') as boolean || false,
      "Rate Info": record.get('Rate Info') as string || '',
      "LinkedIn Profile Link": record.get('LinkedIn Profile Link') as string || '',
      "Profile Photo": record.get('Profile Photo') as string || "/placeholder.svg",
      "Last Verified Date": record.get('Last Verified Date') as string || '',
    }))

    console.log('First mapped professional:', professionals[0])

    return NextResponse.json(professionals)
  } catch (error) {
    console.error('Error fetching professionals from Airtable:', error)
    console.log('Returning mock data due to error')
    return NextResponse.json(mockProfessionals)
  }
}