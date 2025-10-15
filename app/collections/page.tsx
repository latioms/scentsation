'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';
import { Categorie } from '@/types/product';

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Categorie | 'all'>('all');

  const categories: { value: Categorie | 'all'; label: string }[] = [
    { value: 'all', label: 'Tous les produits' },
    { value: 'Parfums', label: 'Parfums' },
    { value: 'Huiles de Parfum', label: 'Huiles de Parfum' },
    { value: 'Déodorants', label: 'Déodorants' },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.categorie === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-muted border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-6xl font-whisper font-bold text-foreground mb-4">
            Nos Collections
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Découvrez notre sélection de fragrances d'exception, des parfums classiques aux huiles précieuses.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category.value
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card text-foreground hover:bg-accent border'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Aucun produit trouvé dans cette catégorie.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
