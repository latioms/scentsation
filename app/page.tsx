import { Metadata } from 'next';
import Link from 'next/link';
import { FeaturedLogos } from '@/components/landing/BrandLogos';
import Hero from '@/components/landing/Hero';
import { FeaturedProductsSimple } from '@/components/landing/FeaturedProductsSimple';
import { Button } from '@/components/ui/button';

// Désactiver le cache pour que les nouveaux produits apparaissent immédiatement
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Scentsation - Parfumerie de Luxe au Cameroun | Fragrances Authentiques',
  description: 'Découvrez Scentsation, votre destination pour les parfums de luxe au Cameroun. Collection exclusive de fragrances authentiques pour homme, femme et mixte. Livraison rapide à Douala et Yaoundé.',
  keywords: 'parfumerie Cameroun, parfums luxe, fragrances authentiques, parfums Douala, parfums Yaoundé, eau de toilette, eau de parfum, Scentsation',
  authors: [{ name: 'Scentsation' }],
  creator: 'Scentsation',
  publisher: 'Scentsation',

  openGraph: {
    title: 'Scentsation - Parfumerie de Luxe au Cameroun',
    description: 'Découvrez notre collection exclusive de parfums de luxe. Fragrances authentiques pour tous les goûts.',
    url: 'https://scentsation.com',
    siteName: 'Scentsation',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Scentsation - Parfumerie de Luxe',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Scentsation - Parfumerie de Luxe au Cameroun',
    description: 'Découvrez notre collection exclusive de parfums de luxe.',
    images: ['/og-home.jpg'],
    creator: '@scentsation',
    site: '@scentsation',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://scentsation.com',
  },

  verification: {
    google: 'your-google-verification-code', // À remplacer par votre code
  },
};

export default async function Home() {
  // Données structurées pour l'organisation
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Scentsation',
    url: 'https://scentsation.com',
    logo: 'https://scentsation.com/logo.png',
    description: 'Parfumerie de luxe au Cameroun',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CM',
      addressRegion: 'Littoral',
      addressLocality: 'Douala',
    },
    sameAs: [
      'https://facebook.com/scentsation',
      'https://instagram.com/scentsation',
      'https://twitter.com/scentsation',
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Scentsation',
    url: 'https://scentsation.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://scentsation.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="min-h-screen">
      {/* Données structurées JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}

      {/* Brand Logos Section */}
      <FeaturedLogos />

      {/* Featured Products Section */}
      <FeaturedProductsSimple />

      {/* USP Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">Une Expérience Olfactive Unique</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Chaque fragrance de notre collection est soigneusement sélectionnée pour offrir une expérience sensorielle
              exceptionnelle. Des notes florales délicates aux accords boisés profonds, trouvez le parfum qui vous
              ressemble.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href="/products">Voir Tous les Produits</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
