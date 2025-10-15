export type Sexe = 'Homme' | 'Femme' | 'Mixte';

export type Categorie = 'Parfums' | 'Huiles de Parfum' | 'Déodorants';

export interface Product {
  id: string;
  titre: string;
  marque: string;
  description: string;
  sexe: Sexe;
  contenance: string; // "10ml", "50ml", "100ml"
  prix: number; // Prix en XAF
  categorie: Categorie;
  rating: number; // Note moyenne sur 5
  ratings: number; // Nombre de votes
  image: string; // URL de l'image
  images?: string[]; // Images additionnelles
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
