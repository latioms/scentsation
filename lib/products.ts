import { Product } from '@/types/product';
import { databases } from './appwrite';
import { Query } from 'appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const PRODUCTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID!;

// Fonction pour récupérer tous les produits depuis Appwrite
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      [Query.orderDesc('$createdAt'), Query.limit(100)]
    );
    
    return response.documents.map(doc => ({
      id: doc.$id,
      titre: doc.titre,
      marque: doc.marque,
      description: doc.description,
      sexe: doc.sexe,
      contenance: doc.contenance,
      prix: doc.prix,
      categorie: doc.categorie,
      thumbnail: doc.thumbnail,
      images: doc.images || [],
      likes: doc.likes || 0,
      inStock: doc.inStock,
      isNew: doc.isNew || false,
      isBestSeller: doc.isBestSeller || false,
    })) as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fonction pour obtenir les marques uniques
export function getUniqueMarques(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.marque).filter(Boolean))).sort();
}

// Fonction pour obtenir les contenances uniques
export function getUniqueContenances(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.contenance).filter(Boolean))).sort();
}

// Fonction pour obtenir la plage de prix
export function getPriceRange(products: Product[]): { min: number; max: number } {
  if (products.length === 0) {
    return { min: 0, max: 100000 };
  }
  const prices = products.map((p) => p.prix);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}
