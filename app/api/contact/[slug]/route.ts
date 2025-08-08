
import { NextRequest, NextResponse } from 'next/server'
import Airtable from 'airtable'

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Parse the request body
    const { name, email, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Get environment variables
    const apiKey = process.env.AIRTABLE_API_KEY
    const baseId = process.env.AIRTABLE_BASE_ID

    if (!apiKey || !baseId) {
      console.error('Missing Airtable environment variables')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Create Airtable base instance
    const base = new Airtable({
      apiKey: apiKey
    }).base(baseId)

    // Find the professional by slug
    const records = await base('Table 1').select({
      view: 'Grid view',
      filterByFormula: `{Slug} = "${params.slug}"`
    }).all()

    if (records.length === 0) {
      return NextResponse.json(
        { error: 'Professional not found' },
        { status: 404 }
      )
    }

    const record = records[0]
    const fields = record.fields

    // Helper function to get field value by trying different possible field names
    const getField = (possibleNames: string[], defaultValue: any = '') => {
      for (const name of possibleNames) {
        if (fields[name] !== undefined && fields[name] !== null) {
          return fields[name]
        }
      }
      return defaultValue
    }

    // Check if the professional is accepting inquiries
    const isAcceptingInquiries = getField(['Is Accepting Inquiries', 'is accepting inquiries', 'Accepting Inquiries'])
    
    if (isAcceptingInquiries !== true) {
      return NextResponse.json(
        { error: 'This professional is not currently accepting inquiries' },
        { status: 400 }
      )
    }

    // Get professional details
    const contactEmail = getField(['Contact Email', 'contact email', 'Email', 'email'], '')
    const displayName = getField(['Display Name', 'display name', 'Display'], '') || 
                       getField(['Name', 'Full Name', 'name'], '')

    if (!contactEmail) {
      console.error('No contact email found for professional:', params.slug)
      return NextResponse.json(
        { error: 'Professional contact information not available' },
        { status: 500 }
      )
    }

    // Log the contact details (for now, instead of sending email)
    console.log({
      to: contactEmail,
      name: displayName,
      email: email,
      message: message
    })

    return NextResponse.json({ ok: true })

  } catch (error) {
    console.error('Error processing contact request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
