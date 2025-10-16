import { Metadata } from 'next';
import SearchClient from '@/components/SearchClient';

export const metadata: Metadata = {
  title: 'Rechercher un Parfum | Scentsation',
  description: 'Recherchez votre parfum idéal parmi notre vaste collection. Filtrez par marque, catégorie, sexe et prix pour trouver la fragrance parfaite.',
  keywords: 'recherche parfum, trouver parfum, filtrer parfum, parfumerie, fragrances',
  
  openGraph: {
    title: 'Rechercher un Parfum | Scentsation',
    description: 'Recherchez votre parfum idéal parmi notre vaste collection.',
    url: 'https://scentsation.com/search',
    siteName: 'Scentsation',
    locale: 'fr_FR',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Rechercher un Parfum | Scentsation',
    description: 'Recherchez votre parfum idéal parmi notre vaste collection.',
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: 'https://scentsation.com/search',
  },
};

export default function SearchPage() {
  return <SearchClient />;
}
