import { Inter } from 'next/font/google'
import './globals.css'
import '../components/home/allProjects/projectsOnPage/projectsOnPage.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Projects',
  description: 'SHL Assignment',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>{children}</body>
    </html>
  )
}
