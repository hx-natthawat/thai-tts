import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Thai Text to Speech',
  description: 'A modern Thai text-to-speech application with advanced configuration options',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
