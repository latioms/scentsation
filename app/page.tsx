import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/products';
import { ArrowRight } from 'lucide-react';
import { FeaturedLogos } from '@/components/landing/BrandLogos';
import Hero from '@/components/landing/Hero';

export default async function Home() {
  const products = await getAllProducts();
  const featuredProducts = products.filter((p) => p.isBestSeller || p.isNew).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}

      {/* Brand Logos Section */}
      <FeaturedLogos />

      {/* Featured Products Section */}


      {/* USP Section */}
    </div>
  );
}
