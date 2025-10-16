"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500">
      <div className="bg-[#e8dcc8]/95 backdrop-blur-sm border-t border-neutral-200/50 shadow-lg">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Content */}
            <div className="flex-1 space-y-2">
              <h3 className="font-serif text-lg font-medium text-neutral-900">Nous utilisons des cookies</h3>
              <p className="text-sm text-neutral-700 leading-relaxed max-w-2xl">
                Nous utilisons des cookies pour améliorer votre expérience de navigation, analyser le trafic du site et
                personnaliser le contenu. En cliquant sur "Accepter", vous consentez à notre utilisation des cookies.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button
                variant="outline"
                onClick={handleReject}
                className="border-neutral-300 hover:bg-neutral-100 text-neutral-700 bg-transparent"
              >
                Refuser
              </Button>
              <Button onClick={handleAccept} className="bg-neutral-900 hover:bg-neutral-800 text-white">
                Accepter tout
              </Button>
            </div>

            {/* Close button for mobile */}
            <button
              onClick={handleReject}
              className="absolute top-4 right-4 lg:hidden text-neutral-600 hover:text-neutral-900"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
