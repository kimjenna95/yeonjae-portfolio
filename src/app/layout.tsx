import type { Metadata } from 'next'
import Script from 'next/script'
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BNE5BVFLD2"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BNE5BVFLD2');
        `}</Script>
        {children}
      </body>
    </html>
  )
}
