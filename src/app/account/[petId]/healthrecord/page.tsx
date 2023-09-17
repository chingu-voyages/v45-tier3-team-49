'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface HealthRecord {
  petId: string
  id: string
  allergies: string | null
  medication: string | null
  vaccinations: string | null
  chronicIssues: string | null
  routineCheckup: Date | null
  exerciseRoutine: string | null
  createdAt: Date
  healthId: string
}

function Health() {
  const { petId } = useParams()

  const [healthRecord, setHealthRecord] = useState<HealthRecord | string>('')

  useEffect(() => {
    async function getHealthRecords() {
      try {
        const res = await fetch(`/api/healthRecords/${petId}`)
        if (res) {
          const data = await res.json()
          setHealthRecord(data)
        } else {
          console.error('Failed to get health records')
        }
      } catch (error) {
        console.error('Error fetching health records:', error)
      }
    }
    getHealthRecords()
  }, [petId])

  return !healthRecord ? (
    <div>Loading...</div>
  ) : typeof healthRecord === 'string' ? (
    <div>{healthRecord}</div>
  ) : (
    <div>
      <h1>Health</h1>

      <div>
        <div className='text-large'>
          <div>Allergies: {healthRecord?.allergies}</div>
          <div>Medication: {healthRecord?.medication}</div>
          <div>Vaccinations:{healthRecord?.vaccinations}</div>
          <div>Chronic: {healthRecord?.chronicIssues}</div>
          {/* <div>{healthRecord?.routineCheckup?.getUTCDate()}</div> */}
          <div>Exercise: {healthRecord?.exerciseRoutine}</div>
        </div>
      </div>
    </div>
  )
}

export default Health
