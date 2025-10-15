"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import type { Filters } from "./products-client"

type ProductFiltersProps = {
  filters: Filters
  setFilters: (filters: Filters) => void
}

const SIZES = ["30ml", "50ml", "75ml", "100ml", "150ml"]
const GENDERS = ["Homme", "Femme", "Mixte"]
const BRANDS = ["Chanel", "Dior", "Hermès", "Tom Ford", "Acqua di Parma", "Lancôme", "Gucci", "Yves Saint Laurent"]
const CATEGORIES = ["Eau de Parfum", "Eau de Toilette", "Eau de Cologne", "Parfum"]

export function ProductFilters({ filters, setFilters }: ProductFiltersProps) {
  const [openSections, setOpenSections] = useState({
    size: true,
    gender: true,
    brand: true,
    category: true,
    price: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleCheckboxChange = (filterType: "sizes" | "genders" | "brands" | "categories", value: string) => {
    const currentValues = filters[filterType]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]
    setFilters({ ...filters, [filterType]: newValues })
  }

  const resetFilters = () => {
    setFilters({
      sizes: [],
      genders: [],
      brands: [],
      categories: [],
      maxPrice: 300,
    })
  }

  const hasActiveFilters =
    filters.sizes.length > 0 ||
    filters.genders.length > 0 ||
    filters.brands.length > 0 ||
    filters.categories.length > 0 ||
    filters.maxPrice < 300

  return (
    <div className="space-y-6">
      {hasActiveFilters && (
        <Button variant="ghost" onClick={resetFilters} className="w-full text-sm">
          Réinitialiser les filtres
        </Button>
      )}

      {/* Contenance */}
      <Collapsible open={openSections.size} onOpenChange={() => toggleSection("size")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium">
          Contenance
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.size ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-3">
          {SIZES.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={filters.sizes.includes(size)}
                onCheckedChange={() => handleCheckboxChange("sizes", size)}
              />
              <Label htmlFor={`size-${size}`} className="text-sm font-normal cursor-pointer">
                {size}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border" />

      {/* Sexe */}
      <Collapsible open={openSections.gender} onOpenChange={() => toggleSection("gender")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium">
          Sexe
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.gender ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-3">
          {GENDERS.map((gender) => (
            <div key={gender} className="flex items-center space-x-2">
              <Checkbox
                id={`gender-${gender}`}
                checked={filters.genders.includes(gender)}
                onCheckedChange={() => handleCheckboxChange("genders", gender)}
              />
              <Label htmlFor={`gender-${gender}`} className="text-sm font-normal cursor-pointer">
                {gender}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border" />

      {/* Marque */}
      <Collapsible open={openSections.brand} onOpenChange={() => toggleSection("brand")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium">
          Marque
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.brand ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-3">
          {BRANDS.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => handleCheckboxChange("brands", brand)}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border" />

      {/* Catégorie */}
      <Collapsible open={openSections.category} onOpenChange={() => toggleSection("category")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium">
          Catégorie
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.category ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-3">
          {CATEGORIES.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => handleCheckboxChange("categories", category)}
              />
              <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border" />

      {/* Prix */}
      <Collapsible open={openSections.price} onOpenChange={() => toggleSection("price")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium">
          Prix
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.price ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Maximum</span>
              <span className="font-medium">{filters.maxPrice}€</span>
            </div>
            <Slider
              value={[filters.maxPrice]}
              onValueChange={([value]) => setFilters({ ...filters, maxPrice: value })}
              max={300}
              min={0}
              step={5}
              className="w-full"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>0€</span>
              <span>300€</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
