import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
	return (
      <section className="relative min-h-screen flex items-center justify-center bg-[#c9a882] overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 lg:px-8 relative z-10 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Text Content - Left Side */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <div className="space-y-6 max-w-xl mx-auto lg:mx-0">
                <p className="text-sm tracking-[0.2em] uppercase font-light text-neutral-800/70">Fragrance Oil 01</p>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight text-neutral-900 text-balance">
                  The next wave of natural fragrance.
                </h1>
                <p className="text-neutral-700 leading-relaxed text-lg">
                  Découvrez Hypnotic Poison, une fragrance envoûtante qui capture l'essence de l'élégance moderne.
                </p>
                <div className="flex gap-4 justify-center lg:justify-start pt-4">
                  <Button asChild size="lg" className="bg-neutral-900 hover:bg-neutral-800 text-white px-8">
                    <Link href="/products">Découvrir</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white px-8 bg-transparent"
                  >
                    <Link href="/products">Voir la Collection</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Centered Perfume Bottle - Right Side */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <div className="relative w-full max-w-md lg:max-w-lg aspect-square">
                {/* Gradient glow background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200/60 via-rose-200/40 to-purple-200/60 blur-3xl animate-pulse" />

                {/* Circular gradient border */}
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-amber-400 via-rose-300 to-purple-400 p-1 shadow-2xl">
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
