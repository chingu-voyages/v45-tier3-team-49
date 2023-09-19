'use client'

import placeholder from '../../../../public/assets/images/placeholderImg.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PetPage({
  params: { petId }
}: {
  params: { petId: string }
}) {
  const router = useRouter()
  const [pet, setPet] = useState<PetInfo | null>(null)
  const basicBtnStyles = `border-xs border border-black dark:focus:ring-white-800 hover:bg-primary-grey transition-colors duration-150 hover:bg-opacity-30`

  interface PetInfo {
    petName: string
    petType: string
    gender: string
    DOB: string
    diet: {
      foodType: string
      freqPerDay: number
      freqPerWeek: number
      supplements: string[]
    }
    grooming: {
      coatType: string
      schedule: string
      skinCondition: string
    }
    physicalChar: {
      color: string
      height: number
      uniqueChar: string
    }
    note: {
      note: string
    }[]
    PetInsuranceVet: {
      vet: {
        vetName: string
        address: string | null
        appointments: string | null
        specialNotes: string | null
      }
      insurance: {
        policyNum: string | null
        contact: string | null
        emergencyDetails: string | null
      }
    }[]
  }

  function onClick() {
    router.push(`${petId}/healthrecord`)
  }

  useEffect(() => {
    async function getPetDetails() {
      try {
        const res = await fetch(`/api/petsByUser/${petId}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json()
        setPet(data)
      } catch (error) {
        console.error('Error fetching pet details:', error)
      }
    }

    if (petId) {
      getPetDetails()
    }
  }, [petId])

  return (
    <div>
      <button
        className={`${basicBtnStyles} py-.5 rounded-lg px-3`}
        onClick={() => router.back()}
      >
        Back
      </button>
      {pet ? (
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-4xl font-bold'>Pet Details</h1>
          <div className='flex flex-col items-center'>
            <Image
              className='rounded'
              src={placeholder}
              alt='placeholder'
              priority
              width={300}
            />
            <h2 className='font-bold'>
              Pet Name: <a className='font-normal'> {pet.petName}</a>
            </h2>
            <h2 className='font-bold'>
              Date of Birth: <a className='font-normal'> {pet.DOB}</a>
            </h2>
            <h2 className='font-bold'>
              Species: <a className='font-normal'> {pet.petType}</a>
            </h2>
            <h2 className='font-bold'>
              Gender: <a className='font-normal'> {pet.gender}</a>
            </h2>
            {/* buttons */}
            <div className='flex justify-center mt-4'>
              <button
                onClick={onClick}
                className='px-4 py-2 mr-2 text-white bg-blue-500 rounded-lg'
              >
                View Health Info
              </button>
              <button className='px-4 py-2 text-white bg-red-500 rounded-lg'>
                Share
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
