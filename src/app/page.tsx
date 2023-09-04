import Image from 'next/image'
import landing from '../../public/assets/images/landing.png'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex items-center justify-center w-screen h-screen bg-gradient-to-bl from-neon-red via-primary-grey to-primary-white'>
      <div className='flex flex-col items-center justify-between px-10 text-center'>
        <h1 className='font-extrabold text-7xl drop-shadow-lg'>
          Pawsitive Health
        </h1>
        <h2 className='py-10 text-2xl'>
          Your ultimate solution for streamlined pet management
        </h2>
        <div className='flex flex-col w-11/12 py-10 font-bold tracking-wider text-md justify-evenly'>
          <Link
            href={'/account/login'}
            className='mb-4 border border-xs border-black rounded-lg bg-gradient-to-r from-gray-100 via-primary-grey to-primary-white px-5 py-2.5 text-center text-sm font-bold tracking-wider  hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white-800'
          >
            Login
          </Link>
          <Link
            href={'/account/register'}
            className='rounded-lg border border-xs border-black bg-gradient-to-r from-gray-100 via-primary-grey to-primary-white px-5 py-2.5 text-center text-sm hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white-800'
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  )
}
