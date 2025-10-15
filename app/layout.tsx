import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Inter, Whisper } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
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
  title: "Fragrances - Boutique de Parfums",
  description: "Découvrez notre collection de fragrances élégantes",
  generator: "v0.app",
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
        <Analytics />
      </body>
    </html>
  )
}
