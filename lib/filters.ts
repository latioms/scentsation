import { Product, FilterOptions } from '@/types/product';

export function filterProducts(
  products: Product[],
  filters: FilterOptions
): Product[] {
  let filtered = [...products];

  // Filtrer par catégorie
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter((p) => filters.categories!.includes(p.categorie));
  }

  // Filtrer par sexe
  if (filters.sexes && filters.sexes.length > 0) {
    filtered = filtered.filter((p) => filters.sexes!.includes(p.sexe));
  }

  // Filtrer par marque
  if (filters.marques && filters.marques.length > 0) {
    filtered = filtered.filter((p) => filters.marques!.includes(p.marque));
  }

  // Filtrer par contenance
  if (filters.contenances && filters.contenances.length > 0) {
    filtered = filtered.filter((p) => filters.contenances!.includes(p.contenance));
  }

  // Filtrer par prix
  if (filters.priceRange) {
    filtered = filtered.filter(
      (p) =>
        p.prix >= filters.priceRange!.min && p.prix <= filters.priceRange!.max
    );
  }

  // Filtrer par rating
  if (filters.rating) {
    filtered = filtered.filter((p) => p.rating >= filters.rating!);
  }

  return filtered;
}

export function sortProducts(
  products: Product[],
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'name' | 'newest'
): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.prix - b.prix);
    case 'price-desc':
      return sorted.sort((a, b) => b.prix - a.prix);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'name':
      return sorted.sort((a, b) => a.titre.localeCompare(b.titre));
    case 'newest':
      return sorted.filter((p) => p.isNew).concat(sorted.filter((p) => !p.isNew));
    default:
      return sorted;
  }
}
