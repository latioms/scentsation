"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useState } from "react"
import type { Product } from "./products-client"
import Image from "next/image"

type ProductGridProps = {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-muted-foreground mb-2">Aucun produit trouvé</p>
        <p className="text-sm text-muted-foreground">Essayez de modifier vos filtres pour voir plus de résultats</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group overflow-hidden border-border hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <div className="relative aspect-square bg-secondary overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm hover:bg-card"
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart
                  className={`h-5 w-5 ${
                    favorites.has(product.id) ? "fill-destructive text-destructive" : "text-foreground"
                  }`}
                />
              </Button>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm leading-tight truncate">{product.name}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">{product.brand}</p>
                </div>
                <p className="font-medium text-sm whitespace-nowrap">{product.price}€</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{product.category}</span>
                <span>•</span>
                <span>{product.size}ml</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
