'use client';

import { useState, useEffect } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { databases } from '@/lib/appwrite';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { getLikedProducts } from '@/lib/likes';
import { Query } from 'appwrite';
import Link from 'next/link';
import { Button } from './ui/button';

export default function FavoritesClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedProductIds, setLikedProductIds] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    
    try {
      // Récupérer les IDs des produits likés depuis les cookies
      const likedIds = getLikedProducts();
      setLikedProductIds(likedIds);

      if (likedIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
      const collectionId = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID as string;

      // Récupérer les détails des produits depuis Appwrite
      // Appwrite ne supporte pas Query.in() pour plusieurs IDs, donc on fait plusieurs requêtes
      const productPromises = likedIds.map(id => 
        databases.getDocument(databaseId, collectionId, id).catch(() => null)
      );

      const productDocs = await Promise.all(productPromises);
      
      // Filtrer les nulls (produits supprimés ou inexistants)
      const validProducts = productDocs.filter(doc => doc !== null);

      const formattedProducts: Product[] = validProducts.map((doc: any) => ({
        $id: doc.$id,
        titre: doc.titre || '',
        marque: doc.marque || '',
        description: doc.description || '',
        sexe: doc.sexe || 'Mixte',
        contenance: doc.contenance || '',
        prix: doc.prix || 0,
        categorie: doc.categorie || '',
        thumbnail: doc.thumbnail || '',
        images: doc.images || [],
        likes: doc.likes || 0,
        inStock: doc.inStock !== false,
        isNew: doc.isNew || false,
        isBestSeller: doc.isBestSeller || false,
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Recharger les favoris quand un produit est unliké
  const handleLikeChange = () => {
    loadFavorites();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-muted/50 to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Heart className="w-8 h-8 text-primary fill-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mes Favoris
            </h1>
            <p className="text-muted-foreground text-lg">
              {loading ? (
                'Chargement de vos parfums préférés...'
              ) : products.length > 0 ? (
                `${products.length} parfum${products.length > 1 ? 's' : ''} dans vos favoris`
              ) : (
                'Aucun parfum dans vos favoris'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          // État de chargement
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Chargement...</p>
          </div>
        ) : products.length > 0 ? (
          // Grille de produits
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.$id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          // État vide
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              Aucun favori pour le moment
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Explorez notre collection et cliquez sur le cœur pour ajouter vos parfums préférés à vos favoris
            </p>
            <div className="flex gap-4">
              <Link href="/products">
                <Button size="lg">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Découvrir les produits
                </Button>
              </Link>
              <Link href="/collections">
                <Button variant="outline" size="lg">
                  Voir les collections
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Note informative */}
      {!loading && products.length > 0 && (
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Astuce :</strong> Vos favoris sont sauvegardés localement dans votre navigateur. 
                Cliquez à nouveau sur le cœur pour retirer un produit de vos favoris.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
