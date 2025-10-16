export type Sexe = 'Homme' | 'Femme' | 'Mixte';

// Categorie est maintenant dynamique et peut être n'importe quelle string
export type Categorie = string;

export interface Product {
  id: string;
  titre: string;
  marque: string;
  description: string;
  sexe: Sexe;
  contenance: string; // "10ml", "50ml", "100ml"
  prix: number; // Prix en XAF
  categorie: Categorie;
  thumbnail: string; // URL de l'image principale
  images?: string[]; // Images additionnelles (array)
  likes: number; // Nombre de likes
  inStock?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface FilterOptions {
  categories?: Categorie[];
  sexes?: Sexe[];
  marques?: string[];
  contenances?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
}
