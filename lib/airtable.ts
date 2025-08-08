import { mockProfessionals } from './mock-data'

// Define the Professional type based on your Airtable fields
export interface Professional {
  id: string
  "Name": string
  "Short Bio": string
  "Long Bio": string
  "Region": string
  "Expertise": string[]
  "Experience Level": string
  "Languages Spoken": string[]
  "Verified": boolean
  "Rate Info": string
  "Fixed Fee Text": string
  "LinkedIn Profile Link": string
  "Profile Photo": string
  "Last Verified Date": string
  "Founding Member": boolean
}

export async function fetchProfessionals(): Promise<Professional[]> {
  try {
    const response = await fetch('/api/professionals', {
      cache: 'no-store'
    })

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`)
      if (response.status === 502) {
        console.log('502 error detected, retrying...')
        // Wait a bit and retry once for 502 errors
        await new Promise(resolve => setTimeout(resolve, 1000))
        const retryResponse = await fetch('/api/professionals', {
          cache: 'no-store'
        })
        if (retryResponse.ok) {
          const professionals = await retryResponse.json()
          console.log('Successfully fetched professionals on retry:', professionals.length)
          return professionals
        }
      }
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