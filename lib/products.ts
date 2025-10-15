import { Product } from '@/types/product';

// Données exemple - à remplacer par votre base de données
export const products: Product[] = [
  {
    id: '1',
    titre: 'Bleu',
    marque: 'Chanel',
    description: 'Un parfum boisé aromatique qui incarne la liberté. Une composition fraîche et sensuelle.',
    sexe: 'Homme',
    contenance: '100ml',
    prix: 45000,
    categorie: 'Parfums',
    rating: 4.5,
    ratings: 128,
    image: '/products/bleu.jpg',
    inStock: true,
    isBestSeller: true,
  },
  {
    id: '2',
    titre: 'Tobacco Vanille',
    marque: 'Tom Ford',
    description: 'Un parfum oriental et épicé avec des notes de tabac et de vanille crémeuse.',
    sexe: 'Mixte',
    contenance: '50ml',
    prix: 65000,
    categorie: 'Parfums',
    rating: 4.8,
    ratings: 256,
    image: '/products/tobacco-vanille.jpg',
    inStock: true,
    isBestSeller: true,
    isNew: true,
  },
  {
    id: '3',
    titre: 'Coco Mademoiselle',
    marque: 'Chanel',
    description: 'Un parfum oriental frais et moderne. Une signature olfactive unique.',
    sexe: 'Femme',
    contenance: '100ml',
    prix: 48000,
    categorie: 'Parfums',
    rating: 4.7,
    ratings: 189,
    image: '/products/coco.jpg',
    inStock: true,
  },
  {
    id: '4',
    titre: 'Oud Wood',
    marque: 'Tom Ford',
    description: 'Une huile de parfum luxueuse aux notes de bois de oud, épices rares et vanille.',
    sexe: 'Mixte',
    contenance: '10ml',
    prix: 35000,
    categorie: 'Huiles de Parfum',
    rating: 4.6,
    ratings: 94,
    image: '/products/oud-wood.jpg',
    inStock: true,
  },
  {
    id: '5',
    titre: 'Déodorant Fresh',
    marque: 'Tom Ford',
    description: 'Déodorant longue durée avec une fragrance fraîche et élégante.',
    sexe: 'Homme',
    contenance: '75ml',
    prix: 15000,
    categorie: 'Déodorants',
    rating: 4.2,
    ratings: 67,
    image: '/products/deo-fresh.jpg',
    inStock: true,
  },
];

// Fonction pour obtenir les marques uniques
export function getUniqueMarques(): string[] {
  return Array.from(new Set(products.map((p) => p.marque))).sort();
}

// Fonction pour obtenir les contenances uniques
export function getUniqueContenances(): string[] {
  return Array.from(new Set(products.map((p) => p.contenance))).sort();
}

// Fonction pour obtenir la plage de prix
export function getPriceRange(): { min: number; max: number } {
  const prices = products.map((p) => p.prix);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}
