import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
	return (
      <section className="relative min-h-screen flex items-center bg-[#c9a882] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10 py-16 lg:py-0 max-w-7xl">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center min-h-[calc(100vh-8rem)] lg:min-h-0">
            {/* Text Content - Top on Mobile, Left on Desktop */}
            <div className="order-1 text-center lg:text-left relative z-20 w-full lg:flex lg:items-center">
              <div className="space-y-4 md:space-y-6 max-w-xl mx-auto lg:mx-0 lg:max-w-none">
                <p className="text-xs md:text-sm tracking-[0.2em] uppercase font-light text-neutral-800/70">
                  Fragrance Series 01
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-light leading-tight text-neutral-900 text-balance">
                  The next wave of natural fragrance.
                </h1>
                <p className="text-neutral-700 leading-relaxed text-base md:text-lg lg:text-xl max-w-md mx-auto lg:mx-0 lg:max-w-lg">
                  Découvrez Hypnotic Poison, une fragrance envoûtante qui capture l'essence de l'élégance moderne.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 md:pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-none bg-neutral-900 hover:bg-neutral-800 text-white px-8 w-full sm:w-auto"
                  >
                    <Link href="/products">Découvrir</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-none border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white px-8 bg-transparent w-full sm:w-auto"
                  >
                    <Link href="/products">Voir la Collection</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Centered Perfume Bottle - Below Text on Mobile, Right on Desktop */}
            <div className="order-2 flex items-center justify-center w-full lg:h-full">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px]">
                {/* Gradient glow background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200/60 via-rose-200/40 to-purple-200/60 blur-3xl animate-pulse" />

                {/* Circular gradient border */}
                <div className="absolute inset-4 sm:inset-6 lg:inset-8 rounded-full bg-gradient-to-br from-amber-400 via-rose-300 to-purple-400 p-[2px] sm:p-1 shadow-2xl">
                  {/* Inner circle with background */}
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#d4b896] to-[#c9a882] overflow-hidden shadow-inner">
                    {/* Perfume bottle image */}
                    <Image
                      src="/hypnotic-poison.png"
                      alt="Hypnotic Poison - SCENTSATION by KK"
                      fill
                      className="object-cover drop-shadow-2xl"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-white/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-neutral-900/10 to-transparent blur-3xl" />
      </section>
	)
}
