'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { products, getUniqueMarques, getUniqueContenances, getPriceRange } from '@/lib/products';
import { filterProducts, sortProducts } from '@/lib/filters';
import { FilterOptions } from '@/types/product';

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'name' | 'newest'>('newest');

  const marques = getUniqueMarques();
  const contenances = getUniqueContenances();
  const priceRange = getPriceRange();

  const filteredProducts = filterProducts(products, filters);
  const sortedProducts = sortProducts(filteredProducts, sortBy);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-muted border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
            Tous nos Produits
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explorez notre collection complète de fragrances avec des filtres avancés pour trouver votre parfum idéal.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              marques={marques}
              contenances={contenances}
              priceRange={priceRange}
            />
          </aside>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-muted-foreground">
                {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''}
              </p>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="newest">Nouveautés</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="rating">Meilleures notes</option>
                <option value="name">Nom A-Z</option>
              </select>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-lg border">
                <p className="text-muted-foreground text-lg mb-2">
                  Aucun produit trouvé
                </p>
                <p className="text-muted-foreground text-sm">
                  Essayez de modifier vos filtres
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
