
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID
  
  return NextResponse.json({
    hasApiKey: !!apiKey,
    hasBaseId: !!baseId,
    apiKeyLength: apiKey?.length || 0,
    baseIdLength: baseId?.length || 0,
    nodeEnv: process.env.NODE_ENV,
    availableEnvVars: Object.keys(process.env).filter(key => key.includes('AIRTABLE'))
  })
}

export async function POST(request: NextRequest) {
  // Test email environment variables
  const smtpHost = process.env.SMTP_HOST
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const contactEmail = process.env.CONTACT_EMAIL
  
  return NextResponse.json({
    email_config: {
      hasSmtpHost: !!smtpHost,
      hasSmtpUser: !!smtpUser,
      hasSmtpPass: !!smtpPass,
      hasContactEmail: !!contactEmail,
      smtpHost: smtpHost || 'NOT_SET',
      smtpUser: smtpUser || 'NOT_SET',
      contactEmail: contactEmail || 'NOT_SET',
      smtpPassLength: smtpPass?.length || 0
    },
    available_email_vars: Object.keys(process.env).filter(key => 
      key.includes('SMTP') || key.includes('EMAIL') || key.includes('MAIL')
    )
  })
}
