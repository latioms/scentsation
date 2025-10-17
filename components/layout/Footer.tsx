"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#c9a882] border-t  border-neutral-200/50">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand & Description */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-medium text-neutral-900">SCENTSATION <span className="text-sm font-normal">by KK</span></h3>
            <p className="text-sm text-neutral-700 leading-relaxed max-w-sm">
              Votre destination pour les parfums de luxe. Découvrez notre sélection exclusive de fragrances des plus
              grandes marques.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-neutral-900 uppercase tracking-wider text-sm">Navigation</h4>
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-neutral-700 hover:text-neutral-900 transition-colors text-sm">
                Accueil
              </Link>
              <Link href="/products" className="text-neutral-700 hover:text-neutral-900 transition-colors text-sm">
                Produits
              </Link>
              <Link href="/about" className="text-neutral-700 hover:text-neutral-900 transition-colors text-sm">
                À Propos
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-medium text-neutral-900 uppercase tracking-wider text-sm">Newsletter</h4>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Inscrivez-vous pour recevoir nos dernières nouveautés et offres exclusives.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Votre email"
                className="bg-white/50 border-neutral-300 focus:border-neutral-900 rounded-xs text-sm"
                required
              />
              <Button type="submit" className="bg-neutral-900 hover:bg-neutral-800 text-white flex-shrink-0 rounded-xs">
                S'inscrire
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200/50 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-sm text-neutral-600">© 2025 SCENTSATION by KK. Tous droits réservés.</p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 hover:text-neutral-900 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://tiktok.com/@scentsation21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 hover:text-neutral-900 transition-colors"
              aria-label="TikTok"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
