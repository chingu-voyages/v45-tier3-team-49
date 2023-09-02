'use client'

import { getServerSession } from 'next-auth'
import { authOptions } from '../../../pages/api/auth/[...nextauth]'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

//commented out code provides a client side rendering
//will also need 'use client' at the top
export default function Home() {
  // const session = await getServerSession(authOptions)
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
