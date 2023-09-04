'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import logo from '../../../../docs/assets/pawsitive_logo_small.png'

export default function Register() {
  const session = useSession()
  const router = useRouter()
  const [data, setData] = useState({
    email: '',
    password: '',
    username: ''
  })

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/account')
    }
  })

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios
      .post('/api/register', data)
      .then(() => alert('Your account has been registered!'))
      .catch(() => alert('An error occured'))
  }

  return (
    <>
      <div className='flex flex-col justify-center flex-1 min-h-full px-6 py-12 bg-gradient-to-b from-neon-red via-primary-grey to-primary-white lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <Image
            className='w-auto h-10 mx-auto'
            src={logo}
            alt='Your Company'
          />
          <h2 className='mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900'>
            Register for an account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={registerUser}>
            <div>
              <label
                htmlFor='username'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Username
              </label>
              <div className='mt-2'>
                <input
                  id='username'
                  name='username'
                  type='text'
                  required
                  value={data.username}
                  onChange={e => setData({ ...data, username: e.target.value })}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={data.email}
                  onChange={e => setData({ ...data, email: e.target.value })}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
                <div className='text-md'>
                  <a
                    href='#'
                    className='font-semibold text-indigo-400 hover:text-indigo-500'
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  value={data.password}
                  onChange={e => setData({ ...data, password: e.target.value })}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='w-full border-xs dark:focus:ring-white-800 mb-4 rounded-lg border border-black bg-gradient-to-r from-gray-100 via-primary-grey to-primary-white px-5 py-2.5 text-center text-sm font-bold  tracking-wider hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-black'
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
