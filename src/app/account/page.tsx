'use client'

import { Pets } from '@prisma/client'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

async function getPets() {
  const res = await fetch('http://localhost:3000/api/petsByUser', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  return data[0].pet
}

export default function Account() {
  const basicBtnStyles = `border-xs border border-black dark:focus:ring-white-800 bg-slate-100`
  const { data: session } = useSession()
  const router = useRouter()
  const [pets, setPets] = useState<Pets[]>([])

  useEffect(() => {
    getPets().then(pets => setPets(pets))
  }, [])

  return (
    <section className='w-full h-full mt-2 overflow-scroll'>
      <header>
        <nav className='flex justify-between w-11/12 mx-auto'>
          <button
            className={`${basicBtnStyles} py-.5 rounded-lg px-3`}
            onClick={() => router.back()}
          >
            back
          </button>
          <button className={`${basicBtnStyles} py-.5 rounded-lg px-3`}>
            Add Pet
          </button>
        </nav>
      </header>
      {pets.map(({ id, petName, petType, DOB, gender }, i) => {
        return (
          <div
            key={id}
            className='flex justify-between w-11/12 h-24 mx-auto my-4 border border-black rounded-lg'
          >
            <div className='m-2 border rounded-lg bg-gray '>image placeholder</div>
            <div className='flex flex-col items-center justify-evenly'>
              <div className='flex space-x-4'>
                <div>Name: {petName}</div>
                <div>Type:  {petType}</div>
              </div>
              <div><div>DOB: {DOB}</div>
              <div>Gender: {gender}</div></div>
            </div>
              <button type='button' className='self-center mr-3 border border-black rounded-lg min-h-fill py-.5 px-3 border-xs' onClick={() => null}>Details</button>
          </div>
        )
      })}

      <button
        className=' border-xs dark:focus:ring-white-800 mb-4 rounded-lg border border-black bg-gradient-to-r from-gray-100 via-primary-grey to-primary-white px-5 py-2.5 text-center text-sm font-bold  tracking-wider hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-black'
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </section>
  )
}
