import './globals.css'
import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import Provider from '../../pages/context/AuthContext'

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito-sans'
})

export const metadata: Metadata = {
  title: 'Pawsitive Health',
  description: 'Your ultimate solution for streamlined pet management'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${nunitoSans.variable} max-w-xl mx-auto`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
