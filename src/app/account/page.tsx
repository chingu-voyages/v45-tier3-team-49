'use client'

import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div>
      <h1>Client Side Rendered</h1>
      {JSON.stringify(session)}
      <button
        className='w-100 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  )
}
