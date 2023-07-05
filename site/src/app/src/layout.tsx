import './sass/globals.scss'
import { Inter } from 'next/font/google'

import TopNav from './components/TopNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Karina Chow | Portfolio',
  description: 'Personal site for one miss Karina Chow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopNav />
        {children}
      </body>
    </html>
  )
}
