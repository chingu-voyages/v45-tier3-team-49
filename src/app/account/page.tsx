'use client'

import { Pets } from '@prisma/client'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

async function getPets() {
  const res = await fetch('api/petsByUser', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  return data.pet
}

export default function Account() {
  const basicBtnStyles = `border-xs border border-black dark:focus:ring-white-800 hover:bg-primary-grey transition-colors duration-150 hover:bg-opacity-30`
  const { data: session } = useSession()
  const router = useRouter()
  const [pets, setPets] = useState<Pets[]>([])

  useEffect(() => {
    getPets().then(pets => setPets(pets))
  }, [])

  return (
    <section className='w-full h-full mt-2 '>
      <header>
        <nav className='flex justify-between w-11/12 mx-auto'>
          <button
            className={`${basicBtnStyles} py-.5 rounded-lg px-3`}
            onClick={() => router.back()}
          >
            back
          </button>
          <Link
            href={'/account/createPet'}
            className={`${basicBtnStyles} py-.5 rounded-lg px-3`}
          >
            Add Pet
          </Link>
        </nav>
      </header>

      {pets.length !== 0 ? (
        pets.map(({ id, petName, petType, DOB, gender }, i) => {
          return (
            <div
              key={id}
              className='flex justify-between w-11/12 h-24 mx-auto my-4 border border-black rounded-lg'
            >
              <div className='m-2 border rounded-lg bg-gray '>
                image placeholder
              </div>
              <div className='flex flex-col items-start justify-evenly'>
                <div className='flex space-x-4 text-lg'>
                  <div>Name: {petName}</div>
                  <div>Type: {petType}</div>
                </div>
                <div className='text-sm'>
                  <div>DOB: {DOB}</div>
                  <div>Gender: {gender}</div>
                </div>
              </div>
              <div className='flex flex-col items-center justify-evenly'>
                <button
                  type='button'
                  className={`mr-3 self-center rounded-lg ${basicBtnStyles} min-h-fill py-.5 border-xs px-3`}
                  onClick={() => router.push(`/account/${id}`)}
                >
                  Details
                </button>{' '}
                <button
                  type='button'
                  className={`mr-3 self-center rounded-lg ${basicBtnStyles} min-h-fill py-.5 border-xs px-3`}
                  onClick={() => null}
                >
                  Share
                </button>
              </div>
            </div>
          )
        })
      ) : (
        <div className=''>Loading...</div>
      )}
      <button
        className={`mb-4 rounded-lg   px-5 py-2.5 text-center text-sm font-bold  tracking-wider ${basicBtnStyles}  `}
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </section>
  )
}
