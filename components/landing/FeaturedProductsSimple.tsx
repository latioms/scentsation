"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Product } from "@/types/product"
import LikeButton from "@/components/LikeButton"
import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';

export function FeaturedProductsSimple() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Récupérer directement depuis Appwrite sans passer par des fonctions intermédiaires
        const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
        const collectionId = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID;
        
        if (!databaseId || !collectionId) {
          console.error('Missing environment variables:', { databaseId: !!databaseId, collectionId: !!collectionId });
          setError('Configuration incorrecte');
          setLoading(false);
          return;
        }
        
        console.log('FeaturedProducts: Fetching directly from Appwrite...');
        const response = await databases.listDocuments(
          databaseId,
          collectionId,
          [Query.orderDesc('$createdAt'), Query.limit(10)]
        );
        
        if (!response || !response.documents || !Array.isArray(response.documents)) {
          console.error('Invalid response from Appwrite:', response);
          setError('Réponse invalide');
          setLoading(false);
          return;
        }
        
        console.log(`FeaturedProducts: Got ${response.documents.length} products`);
        
        // Convertir les documents en produits
        const products = response.documents.map(doc => ({
          $id: doc.$id,
          titre: doc.titre || 'Sans titre',
          marque: doc.marque || '',
          description: doc.description || '',
          sexe: doc.sexe || 'Mixte',
          contenance: doc.contenance || '',
          prix: doc.prix || 0,
          categorie: doc.categorie || '',
          thumbnail: doc.thumbnail || '',
          images: doc.images || [],
          likes: doc.likes || 0,
          inStock: doc.inStock ?? true,
          isNew: doc.isNew || false,
          isBestSeller: doc.isBestSeller || false,
        }));
        
        // Prendre les 5 premiers
        setFeaturedProducts(products.slice(0, 5));
      } catch (err) {
        console.error('Erreur lors du chargement des produits:', err);
        setError('Erreur de chargement');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' XAF'
  }

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-[#c9a882]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-32 mb-8"></div>
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex-none w-[280px] md:w-[320px]">
                  <div className="bg-neutral-200 rounded-lg h-[400px]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || featuredProducts.length === 0) {
    // En cas d'erreur ou s'il n'y a pas de produits, nous ne montrons pas cette section
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-[#c9a882]">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-2xl font-light mb-8 text-neutral-900">En vedette</h2>

        {/* Horizontal scrollable container */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {featuredProducts.map((product) => (
              <Link
                key={product.$id}
                href={`/products/${product.$id}`}
                className="group flex-none w-[280px] md:w-[320px] snap-start"
              >
                <div className="bg-neutral-100 rounded-none overflow-hidden transition-all duration-300 hover:shadow-lg">
                  {/* Image container */}
                  <div className="relative aspect-square p-8">
                    {/* New or BestSeller badge */}
                    {product.isNew && (
                      <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-light text-neutral-900 shadow-sm">
                        Nouveau
                      </div>
                    )}
                    {!product.isNew && product.isBestSeller && (
                      <div className="absolute top-3 left-3 bg-amber-100 px-3 py-1 rounded-full text-xs font-light text-neutral-900 shadow-sm">
                        Best Seller
                      </div>
                    )}

                    {/* Heart icon */}
                    <div
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-neutral-50 transition-colors"
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
                      <LikeButton
                        productId={product.$id}
                        iconClassName="w-4 h-4"
                        initialCount={product.likes}
                      />
                    </div>

                    {/* Product image - with error handling */}
                    <div className="relative w-full h-full">
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt={product.titre}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error('Image error:', e);
                            // Fallback image
                            (e.target as HTMLImageElement).src = '/placeholder-product.png';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-neutral-200">
                          <span className="text-neutral-500">Image non disponible</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product info */}
                  <div className="p-4 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <h3 className="font-light text-neutral-900 text-sm mb-1 line-clamp-1">
                        {product.titre}
                      </h3>
                      <p className="text-sm text-neutral-600">{product.prix} XAF</p>
                    </div>
                    <p className="font-light text-neutral-500 text-sm">
                      {(product.marque)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View all button */}
        <div className="mt-8 text-center">
          <Button
            asChild
            variant="outline"
            className="border-neutral-300 rounded-none hover:bg-neutral-100 bg-transparent"
          >
            <Link href="/products">Voir tous les produits</Link>
          </Button>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}