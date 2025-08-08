
import { NextRequest, NextResponse } from 'next/server'
import Airtable from 'airtable'
import { mailer } from '@/lib/mailer'

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    // Await params to fix Next.js async params requirement
    const { slug } = await context.params
    
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

    // Find the professional by slug or record ID (since many slugs are empty)
    const records = await base('Table 1').select({
      view: 'Grid view',
      filterByFormula: `OR({Slug} = "${slug}", RECORD_ID() = "${slug}")`
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
      console.error('No contact email found for professional:', slug)
      return NextResponse.json(
        { error: 'Professional contact information not available' },
        { status: 500 }
      )
    }

    // Send email using the mailer utility
    try {
      await mailer.sendEmail({
        to: contactEmail,
        replyTo: email,
        subject: `New inquiry for ${displayName} via Divorce Compass`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #264653;">New Inquiry via Divorce Compass</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Contact Details</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #333;">Message</h3>
              <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #e7f3ff; border-radius: 8px;">
              <p style="margin: 0; font-size: 14px; color: #666;">
                This inquiry was sent through your Divorce Compass profile. You can reply directly to this email to respond to ${name}.
              </p>
            </div>
            
            <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #999;">
              <p>Divorce Compass - UK's First Fully Vetted Divorce Support Directory</p>
            </div>
          </div>
        `,
        text: `
New Inquiry via Divorce Compass

Contact Details:
Name: ${name}
Email: ${email}

Message:
${message}

---
This inquiry was sent through your Divorce Compass profile. You can reply directly to this email to respond to ${name}.

Divorce Compass - UK's First Fully Vetted Divorce Support Directory
        `
      })

      console.log('Email sent successfully to:', contactEmail)
      console.log('Inquiry from:', { name, email, professional: displayName })

    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      return NextResponse.json(
        { error: 'Failed to send inquiry. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      ok: true,
      message: 'Inquiry sent successfully'
    })

  } catch (error) {
    console.error('Error processing contact request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
