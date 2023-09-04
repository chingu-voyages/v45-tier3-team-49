'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

function CreatePet() {
  const basicBtnStyles = `border-xs border border-black dark:focus:ring-white-800 hover:bg-primary-grey transition-colors duration-150 hover:bg-opacity-30`
  const router = useRouter()

  const handlePetSubmit = () => {
    return null
  }

  return (
    <section className='mt-2 h-full w-full '>
      <header>
        <nav className='mx-auto flex w-11/12 justify-between'>
          <button
            className={`${basicBtnStyles} py-.5 rounded-lg px-3`}
            onClick={() => router.back()}
          >
            back
          </button>
        </nav>
      </header>
      <h1 className='text-lg font-bold underline'>Add A New Pet</h1>
      <form className='flex flex-col space-y-4' onSubmit={handlePetSubmit}>
        <label
          htmlFor='pet name'
          className='text-md block font-medium leading-6 text-gray-900'
        >
          Pet Name
        </label>
        <input
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6'
          type='text'
        />
        <label
          htmlFor='pet type'
          className='text-md block font-medium leading-6 text-gray-900'
        >
          Pet Type
        </label>
        <input
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6'
          type='text'
        />
        <label
          htmlFor='gender'
          className='text-md block font-medium leading-6 text-gray-900'
        >
          Gender
        </label>
        <input
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6'
          type='text'
        />{' '}
        <label
          htmlFor='DOB '
          className='text-md block font-medium leading-6 text-gray-900'
        >
          D.O.B (Date of Birth)
        </label>
        <input
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6'
          type='text'
        />
        <button
          type='submit'
          className={`${basicBtnStyles} py-2-5 w-full rounded-lg px-5 focus:outline-none focus:ring-2 focus:ring-black`}
        >
          Submit{' '}
        </button>
      </form>
    </section>
  )
}

export default CreatePet
