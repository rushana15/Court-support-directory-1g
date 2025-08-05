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

    // Debug: Log all records to see what fields actually exist
    console.log('All records with fields:')
    records.forEach((record, index) => {
      console.log(`Record ${index + 1}:`, {
        id: record.id,
        fields: record.fields,
        fieldNames: Object.keys(record.fields)
      })
    })

    // Map fields dynamically based on what actually exists
    const professionals = records.map(record => {
      const fields = record.fields
      const fieldNames = Object.keys(fields)
      
      // Helper function to get field value by trying different possible field names
      const getField = (possibleNames: string[], defaultValue: any = '') => {
        for (const name of possibleNames) {
          if (fields[name] !== undefined && fields[name] !== null) {
            return fields[name]
          }
        }
        return defaultValue
      }

      // Handle profile photo specially - it might be an attachment array
      const getProfilePhoto = () => {
        const photoField = getField(['Profile Photo', 'Photo', 'Image', 'Picture'])
        if (Array.isArray(photoField) && photoField.length > 0) {
          return photoField[0].url || "/placeholder.svg"
        }
        return typeof photoField === 'string' ? photoField : "/placeholder.svg"
      }

      // Handle array fields that might be strings or arrays
      const getArrayField = (possibleNames: string[]) => {
        const value = getField(possibleNames, [])
        if (typeof value === 'string') {
          // Split by comma and clean up each item
          return value.split(',').map(s => s.trim()).filter(s => s.length > 0)
        }
        return Array.isArray(value) ? value : []
      }

      return {
        id: record.id,
        "Name": getField(['Name', 'Full Name', 'name', 'Name ']) || '',
        "Short Bio": getField(['Short Bio', 'Bio', 'Description', 'About', 'short bio']) || '',
        "Long Bio": getField(['Long Bio', 'long bio', 'Long Description', 'Detailed Bio']) || '',
        "Region": getField(['Region', 'Location', 'Area', 'region']) || 'UK',
        "Specialisms": getArrayField(['Specialisms', 'Specialties', 'Skills', 'Areas of expertise', 'specialisms']),
        "Experience Level": getField(['Experience Level', 'Experience', 'Years of Experience', 'experience level']) || '',
        "Languages Spoken": getArrayField(['Languages Spoken', 'Languages', 'Spoken Languages', 'languages spoken']),
        "Verified": getField(['Verified', 'verified', 'Is Verified'], false),
        "Rate Info": getField(['Rate Info', 'Rates', 'Pricing', 'Cost', 'rate info']) || '',
        "Fixed Fee Text": getField(['Fixed Fee Text', 'fixed fee text', 'Fixed Fee', 'fixedFeeText']) || '',
        "LinkedIn Profile Link": getField(['LinkedIn Profile Link', 'LinkedIn', 'LinkedIn URL', 'linkedIn profile link']) || '',
        "Profile Photo": getProfilePhoto(),
        "Last Verified Date": getField(['Last Verified Date', 'Verified Date', 'last verified date']) || '',
      }
    })

    // Filter out records with no name (empty records)
    const validProfessionals = professionals.filter(p => p["Name"] && p["Name"].trim().length > 0)
    
    console.log('Valid professionals count:', validProfessionals.length)
    console.log('First valid professional:', validProfessionals[0])

    return NextResponse.json(validProfessionals)
  } catch (error) {
    console.error('Error fetching professionals from Airtable:', error)
    console.log('Returning mock data due to error')
    return NextResponse.json(mockProfessionals)
  }
}