import { Metadata } from 'next';
import ProductsClient from '@/components/products-client';
import { getAllProducts } from '@/lib/products';

// Désactiver le cache pour cette page afin que les nouveaux produits apparaissent immédiatement
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Nos Parfums | Scentsation - Fragrances de Luxe',
  description: 'Découvrez notre collection exclusive de parfums de luxe pour homme, femme et mixte. Des fragrances authentiques et élégantes pour tous les goûts.',
  keywords: 'parfums, fragrances, parfumerie, luxe, homme, femme, mixte, eau de toilette, eau de parfum, Cameroun',
  
  openGraph: {
    title: 'Nos Parfums | Scentsation',
    description: 'Découvrez notre collection exclusive de parfums de luxe pour homme, femme et mixte.',
    url: 'https://scentsation.com/products',
    siteName: 'Scentsation',
    images: [
      {
        url: '/og-products.jpg',
        width: 1200,
        height: 630,
        alt: 'Collection de parfums Scentsation',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Nos Parfums | Scentsation',
    description: 'Découvrez notre collection exclusive de parfums de luxe.',
    images: ['/og-products.jpg'],
    creator: '@scentsation',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://scentsation.com/products',
  },
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  // Données structurées pour la page de liste de produits
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Nos Parfums',
    description: 'Collection de parfums de luxe',
    url: 'https://scentsation.com/products',
    provider: {
      '@type': 'Organization',
      name: 'Scentsation',
      url: 'https://scentsation.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductsClient products={products} />
    </>
  );
}
