import Link from 'next/link';
import { Product } from '@/types/product';
import { Star } from 'lucide-react';
import ProductImage from './ProductImage';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' XAF';
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
              Nouveau
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-1 rounded">
              Best Seller
            </span>
          )}
        </div>

        {/* Image */}
        <div className="aspect-square bg-muted relative overflow-hidden">
                    <ProductImage src={product.thumbnail} alt={product.titre} />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Marque */}
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
            {product.marque}
          </p>

          {/* Titre */}
          <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
            {product.titre}
          </h3>

          {/* Sexe & Contenance */}
          <p className="text-xs text-muted-foreground mb-2">
            {product.sexe} • {product.contenance}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.likes)
                      ? 'fill-primary text-primary'
                      : 'text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.likes})
            </span>
          </div>

          {/* Prix */}
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-foreground">
              {formatPrice(product.prix)}
            </p>
            {!product.inStock && (
              <span className="text-xs text-destructive font-medium">
                Épuisé
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
