'use client';

import { useState } from 'react';
import { FilterOptions, Categorie, Sexe } from '@/types/product';
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  marques: string[];
  contenances: string[];
  priceRange: { min: number; max: number };
}

export default function ProductFilters({
  filters,
  onFiltersChange,
  marques,
  contenances,
  priceRange,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(filters.priceRange?.max || priceRange.max);
  const [openSections, setOpenSections] = useState({
    categories: true,
    sexes: true,
    marques: true,
    contenances: true,
    prix: true,
  });

  const categories: Categorie[] = ['Parfums', 'Huiles de Parfum', 'Déodorants'];
  const sexes: Sexe[] = ['Homme', 'Femme', 'Mixte'];

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  };

  const handleCategoryToggle = (category: Categorie) => {
    const current = filters.categories || [];
    const updated = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category];
    onFiltersChange({ ...filters, categories: updated });
  };

  const handleSexeToggle = (sexe: Sexe) => {
    const current = filters.sexes || [];
    const updated = current.includes(sexe)
      ? current.filter((s) => s !== sexe)
      : [...current, sexe];
    onFiltersChange({ ...filters, sexes: updated });
  };

  const handleMarqueToggle = (marque: string) => {
    const current = filters.marques || [];
    const updated = current.includes(marque)
      ? current.filter((m) => m !== marque)
      : [...current, marque];
    onFiltersChange({ ...filters, marques: updated });
  };

  const handleContenanceToggle = (contenance: string) => {
    const current = filters.contenances || [];
    const updated = current.includes(contenance)
      ? current.filter((c) => c !== contenance)
      : [...current, contenance];
    onFiltersChange({ ...filters, contenances: updated });
  };

  const handlePriceChange = (value: number) => {
    setCurrentPrice(value);
    onFiltersChange({
      ...filters,
      priceRange: { min: priceRange.min, max: value },
    });
  };

  const clearFilters = () => {
    setCurrentPrice(priceRange.max);
    onFiltersChange({});
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' XAF';
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Catégories */}
      <Collapsible open={openSections.categories} onOpenChange={() => toggleSection('categories')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold text-foreground">
          Catégories
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.categories ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories?.includes(category) || false}
                  onChange={() => handleCategoryToggle(category)}
                  className="rounded border-input text-primary focus:ring-ring"
                />
                <span className="text-sm text-foreground">{category}</span>
              </label>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border" />

      {/* Sexe */}
      <Collapsible open={openSections.sexes} onOpenChange={() => toggleSection('sexes')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold text-foreground">
          Genre
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.sexes ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <div className="space-y-2">
            {sexes.map((sexe) => (
              <label key={sexe} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.sexes?.includes(sexe) || false}
                  onChange={() => handleSexeToggle(sexe)}
                  className="rounded border-input text-primary focus:ring-ring"
                />
                <span className="text-sm text-foreground">{sexe}</span>
              </label>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border" />

      {/* Marques */}
      <Collapsible open={openSections.marques} onOpenChange={() => toggleSection('marques')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold text-foreground">
          Marques
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.marques ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <div className="space-y-2">
            {marques.map((marque) => (
              <label key={marque} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.marques?.includes(marque) || false}
                  onChange={() => handleMarqueToggle(marque)}
                  className="rounded border-input text-primary focus:ring-ring"
                />
                <span className="text-sm text-foreground">{marque}</span>
              </label>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border" />

      {/* Contenance */}
      <Collapsible open={openSections.contenances} onOpenChange={() => toggleSection('contenances')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold text-foreground">
          Contenance
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.contenances ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <div className="space-y-2">
            {contenances.map((contenance) => (
              <label key={contenance} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.contenances?.includes(contenance) || false}
                  onChange={() => handleContenanceToggle(contenance)}
                  className="rounded border-input text-primary focus:ring-ring"
                />
                <span className="text-sm text-foreground">{contenance}ml</span>
              </label>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border" />

      {/* Prix */}
      <Collapsible open={openSections.prix} onOpenChange={() => toggleSection('prix')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold text-foreground">
          Prix maximum
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.prix ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <div className="space-y-2">
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={currentPrice}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <p className="text-sm text-muted-foreground font-medium">
              Jusqu'à {formatPrice(currentPrice)}
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border" />

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full p-2 text-sm font-medium border rounded-sm hover:bg-accent transition-colors"
      >
        Réinitialiser 
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-40 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
      >
        <SlidersHorizontal className="w-6 h-6" />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="bg-card p-6 rounded-non shadow-sm border sticky top-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Filtres</h2>
          </div>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-80 bg-background shadow-xl overflow-y-auto border-l">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Filtres</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-accent rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
