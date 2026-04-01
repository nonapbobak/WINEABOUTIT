import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SevenRooms Experiences | Transform Your Restaurant',
  description: 'AI-powered platform to create unforgettable dining experiences, exclusive events, and premium upgrades tailored to your restaurant.',
  openGraph: {
    title: 'SevenRooms Experiences',
    description: 'Turn every table into a destination. AI-powered experience generation for restaurants.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-sr-black antialiased">
        {children}
      </body>
    </html>
  )
}
