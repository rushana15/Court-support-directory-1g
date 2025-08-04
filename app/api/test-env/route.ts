
import { NextResponse } from 'next/server'

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
