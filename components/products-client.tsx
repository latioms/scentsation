"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { SlidersHorizontal } from "lucide-react"

export type Product = {
  id: string
  name: string
  brand: string
  price: number
  size: string
  gender: "Homme" | "Femme" | "Mixte"
  category: string
  image: string
}

// Données de démonstration
const DEMO_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Eau de Parfum Intense",
    brand: "Chanel",
    price: 145,
    size: "100ml",
    gender: "Femme",
    category: "Eau de Parfum",
    image: "/luxury-perfume-bottle-elegant-feminine.jpg",
  },
  {
    id: "2",
    name: "Cologne Fraîche",
    brand: "Dior",
    price: 98,
    size: "50ml",
    gender: "Homme",
    category: "Eau de Cologne",
    image: "/mens-cologne-bottle-minimalist-blue.jpg",
  },
  {
    id: "3",
    name: "Essence Florale",
    brand: "Hermès",
    price: 165,
    size: "75ml",
    gender: "Femme",
    category: "Eau de Parfum",
    image: "/floral-perfume-bottle-elegant-pink.jpg",
  },
  {
    id: "4",
    name: "Boisé Mystique",
    brand: "Tom Ford",
    price: 220,
    size: "100ml",
    gender: "Mixte",
    category: "Eau de Parfum",
    image: "/luxury-unisex-perfume-bottle-dark-wood.jpg",
  },
  {
    id: "5",
    name: "Citrus Vif",
    brand: "Acqua di Parma",
    price: 125,
    size: "50ml",
    gender: "Mixte",
    category: "Eau de Toilette",
    image: "/citrus-perfume-bottle-yellow-fresh.jpg",
  },
  {
    id: "6",
    name: "Rose Élégante",
    brand: "Lancôme",
    price: 135,
    size: "75ml",
    gender: "Femme",
    category: "Eau de Parfum",
    image: "/rose-perfume-bottle-elegant-pink-gold.jpg",
  },
  {
    id: "7",
    name: "Cuir Intense",
    brand: "Gucci",
    price: 180,
    size: "100ml",
    gender: "Homme",
    category: "Eau de Parfum",
    image: "/leather-mens-perfume-bottle-dark-masculine.jpg",
  },
  {
    id: "8",
    name: "Vanille Douce",
    brand: "Yves Saint Laurent",
    price: 155,
    size: "50ml",
    gender: "Femme",
    category: "Eau de Parfum",
    image: "/vanilla-perfume-bottle-warm-beige-elegant.jpg",
  },
]

export type Filters = {
  sizes: string[]
  genders: string[]
  brands: string[]
  categories: string[]
  maxPrice: number
}

export function ProductsClient() {
  const [filters, setFilters] = useState<Filters>({
    sizes: [],
    genders: [],
    brands: [],
    categories: [],
    maxPrice: 300,
  })
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filteredProducts = DEMO_PRODUCTS.filter((product) => {
    if (filters.sizes.length > 0 && !filters.sizes.includes(product.size)) {
      return false
    }
    if (filters.genders.length > 0 && !filters.genders.includes(product.gender)) {
      return false
    }
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false
    }
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false
    }
    if (product.price > filters.maxPrice) {
      return false
    }
    return true
  })

  const activeFiltersCount =
    filters.sizes.length +
    filters.genders.length +
    filters.brands.length +
    filters.categories.length +
    (filters.maxPrice < 300 ? 1 : 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Filter Button - Fixed at top */}
      <div className="sticky top-0 z-50 bg-background border-b border-border lg:hidden">
        <div className="container mx-auto px-4 py-4">
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="w-full justify-between bg-transparent">
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtres
                </span>
                {activeFiltersCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh]">
              <div className="overflow-y-auto p-4">
                <ProductFilters filters={filters} setFilters={setFilters} />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Filtres</h2>
                {activeFiltersCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <ProductFilters filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-medium mb-2">Nos Fragrances</h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} {filteredProducts.length === 1 ? "produit" : "produits"}
              </p>
            </div>
            <ProductGrid products={filteredProducts} />
          </main>
        </div>
      </div>
    </div>
  )
}
