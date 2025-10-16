import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/ProductDetailClient';
import { getProductById } from '@/lib/products';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: 'Produit introuvable',
      description: 'Le produit que vous recherchez n\'existe pas ou a été supprimé.',
    };
  }

  // Créer une description enrichie
  const description = product.description.length > 160 
    ? `${product.description.substring(0, 157)}...` 
    : product.description;

  // URL du produit
  const productUrl = `https://scentsation.com/products/${id}`;
  
  // Image principale pour les métadonnées
  const imageUrl = product.thumbnail || '/default-product.jpg';

  // Prix formaté
  const priceFormatted = `${product.prix.toLocaleString('fr-FR')} XAF`;

  // Mots-clés pour le SEO
  const keywords = [
    product.marque,
    product.titre,
    product.categorie,
    product.sexe,
    'parfum',
    'fragrance',
    product.contenance,
    'Cameroun',
    'Scentsation'
  ].filter(Boolean).join(', ');

  return {
    title: `${product.titre} - ${product.marque} ${product.contenance} | Scentsation`,
    description: description,
    keywords: keywords,
    authors: [{ name: 'Scentsation' }],
    creator: 'Scentsation',
    publisher: 'Scentsation',
    
    // Open Graph pour les réseaux sociaux (Facebook, LinkedIn, etc.)
    openGraph: {
      title: `${product.titre} - ${product.marque}`,
      description: description,
      url: productUrl,
      siteName: 'Scentsation',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${product.titre} par ${product.marque}`,
        },
        ...(product.images?.slice(0, 3).map(img => ({
          url: img,
          width: 1200,
          height: 630,
          alt: `${product.titre} - Image alternative`,
        })) || [])
      ],
      locale: 'fr_FR',
      type: 'website',
    },

    // Twitter Card pour Twitter/X
    twitter: {
      card: 'summary_large_image',
      title: `${product.titre} - ${product.marque}`,
      description: description,
      images: [imageUrl],
      creator: '@scentsation',
    },

    // Données structurées pour les robots
    other: {
      'product:price:amount': product.prix.toString(),
      'product:price:currency': 'XAF',
      'product:availability': product.inStock ? 'in stock' : 'out of stock',
      'product:condition': 'new',
      'product:brand': product.marque,
      'product:category': product.categorie,
    },

    // Balises robots
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

    // URL canonique
    alternates: {
      canonical: productUrl,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  // Données structurées JSON-LD pour les moteurs de recherche
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.titre,
    description: product.description,
    image: [product.thumbnail, ...(product.images || [])],
    brand: {
      '@type': 'Brand',
      name: product.marque,
    },
    offers: {
      '@type': 'Offer',
      url: `https://scentsation.com/products/${id}`,
      priceCurrency: 'XAF',
      price: product.prix,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Scentsation',
      },
    },
    aggregateRating: product.likes > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: product.likes,
    } : undefined,
    category: product.categorie,
    audience: {
      '@type': 'PeopleAudience',
      suggestedGender: product.sexe,
    },
  };

  return (
    <>
      {/* Injection des données structurées JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
