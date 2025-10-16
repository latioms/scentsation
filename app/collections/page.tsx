import CollectionsClient from '@/components/collections-client';
import { getAllProducts } from '@/lib/products';

export default async function CollectionsPage() {
  const products = await getAllProducts();
  
  // Extraire les catégories uniques
  const categories = Array.from(new Set(products.map(p => p.categorie).filter(Boolean))).sort();

  return <CollectionsClient products={products} categories={categories} />;
}
