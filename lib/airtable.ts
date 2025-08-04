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
    const response = await fetch('/api/professionals')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const professionals = await response.json()
    return professionals
  } catch (error) {
    console.error('Error fetching professionals:', error)
    return []
  }
}