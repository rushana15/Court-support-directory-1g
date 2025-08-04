import { mockProfessionals } from './mock-data'

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
    const response = await fetch('/api/professionals', {
      cache: 'no-store'
    })

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const professionals = await response.json()
    console.log('Successfully fetched professionals:', professionals.length)
    return professionals
  } catch (error) {
    console.error('Error fetching professionals:', error)
    console.log('Falling back to mock data')
    // Fallback to mock data if API call fails
    return mockProfessionals
  }
}