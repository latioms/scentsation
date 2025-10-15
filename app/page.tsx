import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.filter((p) => p.isBestSeller || p.isNew).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-muted border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-foreground mb-6">
              L'Art de la
              <br />
              <span className="italic">Fragrance</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Découvrez notre collection exclusive de parfums d'exception, huiles précieuses et déodorants raffinés. 
              Chaque fragrance raconte une histoire unique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
              >
                Explorer la collection
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground font-medium rounded-lg hover:bg-accent transition-colors border"
              >
                Voir les collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">
            Nos Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Parfums',
                description: 'Des fragrances classiques et modernes',
                href: '/collections',
                image: '🌸',
              },
              {
                title: 'Huiles de Parfum',
                description: 'Des essences concentrées et luxueuses',
                href: '/collections',
                image: '💎',
              },
              {
                title: 'Déodorants',
                description: 'Fraîcheur et élégance au quotidien',
                href: '/collections',
                image: '✨',
              },
            ].map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group relative bg-card rounded-lg p-8 hover:shadow-lg transition-all border hover:border-primary"
              >
                <div className="text-5xl mb-4">{category.image}</div>
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <span className="inline-flex items-center text-primary font-medium group-hover:text-primary/80">
                  Découvrir
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
                Produits Vedettes
              </h2>
              <p className="text-muted-foreground">
                Nos best-sellers et nouveautés
              </p>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center text-primary font-medium hover:text-primary/80"
            >
              Voir tout
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center text-primary font-medium hover:text-primary/80"
            >
              Voir tous les produits
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-16 bg-background border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚚',
                title: 'Livraison Rapide',
                description: 'Livraison à domicile dans toute la région',
              },
              {
                icon: '✅',
                title: 'Authenticité Garantie',
                description: 'Tous nos produits sont 100% authentiques',
              },
              {
                icon: '💝',
                title: 'Service Client',
                description: 'Une équipe à votre écoute 7j/7',
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
