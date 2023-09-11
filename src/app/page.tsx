import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex h-full w-full flex-col justify-center '>
      <div className='absolute flex flex-col items-center justify-between px-10 text-center'>
        <h1 className='text-7xl font-extrabold drop-shadow-lg'>
          Pawsitive Health
        </h1>
        <h2 className='py-10 text-2xl'>
          Your ultimate solution for streamlined pet management
        </h2>
        <div className='text-md flex w-11/12 flex-col justify-evenly py-10 font-bold tracking-wider transition-colors duration-150'>
          <Link
            href={'/account/login'}
            className='border-xs dark:focus:ring-white-800 mb-4 rounded-lg border border-black px-5  py-2.5 text-center text-sm font-bold tracking-wider hover:bg-primary-grey  hover:bg-opacity-30 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-black'
          >
            Login
          </Link>
          <Link
            href={'/account/register'}
            className='border-xs dark:focus:ring-white-800 rounded-lg border border-black px-5  py-2.5 text-center text-sm hover:bg-primary-grey hover:bg-opacity-30 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-black'
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  )
}
