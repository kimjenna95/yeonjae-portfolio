import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yeonjae Kim — Product Designer',
  description:
    'Senior UX/UI Product Designer at Cisco. Designing data-driven experiences for enterprise and consumer products.',
  openGraph: {
    title: 'Yeonjae Kim — Product Designer',
    description: 'Senior UX/UI Product Designer at Cisco.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-barlow" style={{ background: '#101314', color: '#fff', fontWeight: 300 }}>
        {children}
      </body>
    </html>
  )
}
