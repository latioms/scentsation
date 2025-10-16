import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Inter, Whisper } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

const whisper = Whisper({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-whisper",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://scentsation.com'),
  title: {
    default: 'Scentsation - Parfumerie de Luxe au Cameroun',
    template: '%s | Scentsation',
  },
  description: 'Découvrez notre collection exclusive de parfums de luxe au Cameroun. Fragrances authentiques pour homme, femme et mixte.',
  generator: "Next.js",
  applicationName: 'Scentsation',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'parfumerie',
    'parfums luxe',
    'fragrances',
    'Cameroun',
    'Douala',
    'Yaoundé',
    'eau de toilette',
    'eau de parfum',
    'homme',
    'femme',
    'mixte',
  ],
  authors: [{ name: 'Scentsation', url: 'https://scentsation.com' }],
  creator: 'Scentsation',
  publisher: 'Scentsation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Scentsation - Parfumerie de Luxe au Cameroun',
    description: 'Découvrez notre collection exclusive de parfums de luxe',
    url: 'https://scentsation.com',
    siteName: 'Scentsation',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scentsation - Parfumerie de Luxe',
    description: 'Découvrez notre collection exclusive de parfums de luxe',
    creator: '@scentsation',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${inter.variable} ${cormorant.variable} ${whisper.variable}`}>
        <Navbar />
        {children}
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  )
}
